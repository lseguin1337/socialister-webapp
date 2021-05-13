import { ref } from '../lib/reactive';
import { user } from './user';

interface Route {
  path: string | RegExp;
  props: any;
  component: Promise<any> | any;
  requireAuth?: boolean;
}

export function useRouter(routes: Route[]) {
  const route = ref({ path: '', props: {}, component: new Promise<any>(() => {}) } as Route);

  function updateRoute() {
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
    route.value = current;
  }

  window.addEventListener("hashchange", updateRoute, false);
  updateRoute();

  return {
    route
  };
}