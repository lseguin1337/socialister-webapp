import { useRouteResolver } from './use-route-matcher';
import { useCurrentUrl } from './use-current-url';
import { useRouteLink } from './use-route-link';
import { useRouteLoader } from './use-route-loader';

type SvelteComponent = any;

export interface RouteDef {
  name: string;
  path: string;
  guards?: (() => boolean)[];
  loader(): Promise<SvelteComponent> | SvelteComponent;
  paramsToProps?: (params: any) => any | Promise<any>;
}

export function createRouter(routes: RouteDef[]) {
  const { url } = useCurrentUrl();
  const { resolve, reverse } = useRouteResolver(routes);
  const { route, load, loading: routing } = useRouteLoader();
  const { routeLink } = useRouteLink({ route, getUrl, navigate });

  async function updateRoute() {
    const { current, params } = resolve(url.value);
    if (!current) {
      // TODO: 404 strategy?
      route.value = null;
      return;
    }
    if (current.guards?.some(guard => !guard())) {
      // do nothing move rejected
      return;
    }
    await load(current, params);
  }

  function getUrl(routeName: string, params?: any) {
    const url = reverse(routeName, params);
    if (!url) {
      console.warn(`Unknown Route Name "${routeName}"`);
      return '#/';
    }
    return `#${url}`;
  }

  function navigate(routeName: string, params?: any) {
    location.href = getUrl(routeName, params);
  }

  function start() {
    return url.subscribe(updateRoute);
  }

  return {
    route,
    routing,
    navigate,
    routeLink,
    getUrl,
    start,
  };
}