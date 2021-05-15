// Svelte Routing Library

import CompiledRoute from 'route-parser';
import { ref } from '../reactive';
import RouterC from './Router.svelte';

export const RouterComponent = RouterC;

type SvelteComponent = any;

export interface RouteDef {
  name: string;
  path: string;
  route?: CompiledRoute;
  guards?: (() => boolean)[];
  loader(): Promise<SvelteComponent> | SvelteComponent;
  paramsToProps?: (params: any) => any | Promise<any>;
}

export interface Route {
  name: string;
  props: any;
  Component: any;
}

function useCurrentUrl() {
  const url = ref(null as string);

  function computeUrl() {
    url.value = window.location.hash.replace(/^#/, '') || '/';
  }
  window.addEventListener("hashchange", computeUrl, false);
  computeUrl();

  return {
    url,
  };
}

function getRouteConfig(config: string | [string, any]) {
  const name = typeof config === 'string' ? config : config[0];
  const params = typeof config === 'string' ? {} : config[1];

  return {
    name,
    params,
  };
}

function compileRoute(route: string) {
  return new CompiledRoute(route);
}

async function prepareRoute(def: RouteDef, params: any): Promise<Route> {
  return {
    name: def.name,
    props: def.paramsToProps ? await def.paramsToProps(params) : params,
    Component: await def.loader(),
  };
}

function getMatchingRoute(routes: RouteDef[], currentUrl: string) {
  for (const route of routes) {
    const params = route.route.match(currentUrl);
    if (params) {
      return { current: route, params };
    }
  }
}

export function createRouter(_routes: Omit<RouteDef, 'compiled'>[]) {
  const { url } = useCurrentUrl();
  const route = ref(null as Route);
  const routing = ref(false);

  const routes = _routes.map((r) => {
    return {
      ...r,
      route: compileRoute(r.path),
    };
  });

  async function updateRoute() {
    try {
      routing.value = true;
      const { current, params } = getMatchingRoute(routes, url.value);
      if (!current) {
        // TODO: 404 strategy?
        route.value = null;
        return;
      }
      if (current.guards?.some(guard => !guard())) {
        // do nothing move rejected
        return;
      }
      route.value = await prepareRoute(current, params);
    } finally {
      routing.value = false;
    }
  }

  function generateUrl(routeName: string, params?: any) {
    const r = routes.find(({ name }) => name === routeName);
    if (!r) {
      console.warn(`Unknown Route Name "${routeName}"`);
      return '#/';
    }
    return `#` + r.route.reverse(params || {});
  }

  function navigate(routeName: string, params?: any) {
    location.href = generateUrl(routeName, params);
  }

  function routeLink(element: HTMLElement, config: string | [string, any]) {
    let current: { name: string, params: any };
    
    function redirectTo() {
      navigate(current.name, current.params);
    }
  
    function updateActive() {
      const isActive = current.name === route.value?.name;
      if (isActive)
        element.classList.add('route-active');
      else
        element.classList.remove('route-active');
    }
  
    function updatePath(config: string | [string, any]) {
      current = getRouteConfig(config);
      if (element.localName === 'a')
        element.setAttribute('href', generateUrl(current.name, current.params));
    }
  
    if (element.localName !== 'a')
        element.addEventListener('click', redirectTo);
  
    updatePath(config);
    const unsubscribeRouteChange = route.subscribe(updateActive);
  
    return {
      update: updatePath,
      destroy() {
        element.removeEventListener('click', redirectTo);
        unsubscribeRouteChange();
      }
    };
  }

  function start() {
    return url.subscribe(updateRoute);
  }

  return {
    route,
    routing,
    navigate,
    routeLink,
    start,
  };
}