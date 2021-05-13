<script lang="typescript">
  import { useRouter } from '../composables/router';

  const { route } = useRouter([
    {
      path: '/',
      get props() { return {}; },
      get component() { return import('./HomePage.svelte').then(m => m.default); },
    },
    {
      path: '/login',
      get props() { return {}; },
      get component() { return import('./LoginPage.svelte').then(m => m.default); },
    },
    {
      path: '/settings',
      requireAuth: true,
      get props() { return {}; },
      get component() { return import('./SettingsPage.svelte').then(m => m.default); },
    },
    {
      path: '/overview',
      requireAuth: true,
      get props() { return {}; },
      get component() { return import('./OverviewPage.svelte').then(m => m.default); },
    },
  ]);
</script>

<section>
  {#await $route?.component}
    Loading...
  {:then Component}
    <Component {...$route.props}></Component>
  {:catch error}
    <p>error { error.message }</p>
  {/await}
</section>

<style>
</style>