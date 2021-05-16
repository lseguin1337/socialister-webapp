import { createRouter } from '../lib/router';
import { user } from '../composables/user';

// Main Router

function authGuard() {
  if (!user.value) {
    navigate('login');
    return false;
  }
  return true;
}

function notAuthGuard() {
  if (user.value) {
    navigate('overview');
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
    guards: [notAuthGuard],
    loader: () => import('./LoginPage.svelte').then(m => m.default),
  },
  {
    name: 'signup',
    path: '/signup',
    guards: [notAuthGuard],
    loader: () => import('./SignupPage.svelte').then(m => m.default),
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
  {
    name: 'rage',
    path: '/rage',
    guards: [authGuard],
    loader: () => import('./RagePage.svelte').then(m => m.default),
  },
  {
    name: 'stars',
    path: '/stars',
    guards: [authGuard],
    loader: () => import('./StarsPage.svelte').then(m => m.default),
  },
  {
    name: 'population',
    path: '/population/:popId',
    guards: [authGuard],
    paramsToProps: async ({ popId }) => {
      // load popId
      return {
        pop: { id: popId },
      };
    },
    loader: () => import('./PopulationPage.svelte').then(m => m.default),
  },
]);

export const { routing, routeLink, navigate } = router;