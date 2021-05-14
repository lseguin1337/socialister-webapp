<script lang="typescript">
  import NavBar from './components/NavBar.svelte';
  import Router from './routes/Router.svelte';
  import { me } from './composables/user';

  const loading$ = me().catch(() => {});
</script>

<main>
  {#await loading$}
    Loading...
  {:then _}
    <div class="App--header">
      <NavBar></NavBar>
    </div>
    <div class="App--content">
      <Router></Router>
    </div>
  {/await}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .App--header {
  }

  .App--content {
    flex: 1;
    height: 100%;
  }
</style>