import { Route } from "./use-route-loader";
import { Reactive } from "../reactive/reactive";

interface Router {
  route: Reactive<Route>,
  navigate: (name: string, params: any) => any,
  getUrl: (name: string, params: any) => string,
}

function getRouteConfig(config: string | [string, any]) {
  const name = typeof config === 'string' ? config : config[0];
  const params = typeof config === 'string' ? {} : config[1];

  return {
    name,
    params,
  };
}

export function useRouteLink(router: Router) {
  function routeLink(element: HTMLElement, config: string | [string, any]) {
    let current: { name: string, params: any };
    
    function redirectTo() {
      router.navigate(current.name, current.params);
    }
  
    function updateActive() {
      const isActive = current.name === router.route.value?.name;
      if (isActive)
        element.classList.add('route-active');
      else
        element.classList.remove('route-active');
    }
  
    function updatePath(config: string | [string, any]) {
      current = getRouteConfig(config);
      if (element.localName === 'a')
        element.setAttribute('href', router.getUrl(current.name, current.params));
    }
  
    if (element.localName !== 'a')
        element.addEventListener('click', redirectTo);
  
    updatePath(config);
    const unsubscribeRouteChange = router.route.subscribe(updateActive);
  
    return {
      update: updatePath,
      destroy() {
        element.removeEventListener('click', redirectTo);
        unsubscribeRouteChange();
      }
    };
  }

  return {
    routeLink,
  };
}