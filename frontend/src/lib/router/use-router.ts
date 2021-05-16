import { useRouteResolver } from './use-route-matcher';
import { useCurrentUrl } from './use-current-url';
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

  async function updateRoute() {
    const match = resolve(url.value);
    if (!match) {
      // TODO: 404 strategy?
      route.value = null;
      return;
    }
    if (match.route.guards?.some(guard => !guard())) {
      // do nothing move rejected
      return;
    }
    await load(match.route, match.params);
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
    getUrl,
    start,
  };
}