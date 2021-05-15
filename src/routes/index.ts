import { createRouter } from '../lib/router';
import { user } from '../composables/user';

// Main Router

function authGuard() {
  if (!user.value) {
    router.navigate('login');
    return false;
  }
  return true;
}

export const router = createRouter([
  {
    name: 'home',
    path: '/',
    loader: () => import('./HomePage.svelte').then(m => m.default),
  },
  {
    name: 'login',
    path: '/login',
    loader: () => import('./LoginPage.svelte').then(m => m.default),
  },
  {
    name: 'settings',
    path: '/settings',
    guards: [authGuard],
    loader: () => import('./SettingsPage.svelte').then(m => m.default),
  },
  {
    name: 'overview',
    path: '/overview',
    guards: [authGuard],
    loader: () => import('./OverviewPage.svelte').then(m => m.default),
  },
]);

export const routeLink = router.routeLink;
export const routing = router.routing;