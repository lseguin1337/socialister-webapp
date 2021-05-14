import { ref } from '../lib/reactive';
import { user } from './user';

interface Route {
  path: string | RegExp;
  props: any;
  component: Promise<any> | any;
  requireAuth?: boolean;
}

function routeChange(handler: Function) {
  window.addEventListener("hashchange", handler as any, false);
  handler();

  return () => {
    window.removeEventListener("hashchange", handler as any, false);
  };
}

export function useRouter(routes: Route[]) {
  const route = ref({ path: '', props: {}, component: new Promise<any>(() => {}) } as Route);
  const routing = ref(false);

  async function updateRoute() {
    try {
      routing.value = true;
      const path = location.hash.replace(/^#/, '') || '/';
      const current = routes.find((r) => {
        return typeof r.path === 'string' ? path === r.path : path.match(r.path);
      });
      if (!current) {
        return location.href = '#/';
      }
      if (current.requireAuth && !user.value) {
        return location.href = '#/login';
      }
      await current.component;
      route.value = current;
    } finally {
      routing.value = false;
    }
  }

  routeChange(updateRoute);
  user.subscribe(updateRoute);

  return {
    route,
    routing,
  };
}

export function route(element: HTMLElement, path: string) {
  function redirectTo() {
    location.href = `#${path}`;
  }

  function updateActive() {
    const isActive = location.hash.replace(/^#/, '') === path;
    if (isActive)
      element.classList.add('route-active');
    else
      element.classList.remove('route-active');
  }

  function updatePath(newPath: string) {
    path = newPath;
    if (element.localName === 'a')
      element.setAttribute('href', `#${path}`);
    
  }

  if (element.localName !== 'a')
      element.addEventListener('click', redirectTo);

  updatePath(path);
  const unsubscribeRouteChange = routeChange(updateActive);

  return {
    update: updatePath,
    destroy() {
      element.removeEventListener('click', redirectTo);
      unsubscribeRouteChange();
    }
  };
}