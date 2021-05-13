<script lang="typescript">
  import NavBar from './components/NavBar.svelte';
  import Router from './routes/Router.svelte';
  import { me } from './composables/user';

  const loading$ = me();
</script>

<main>
  {#await loading$}
    Loading...
  {:then _}
    <NavBar></NavBar>
    <Router></Router>
  {/await}
</main>

<style>
</style>