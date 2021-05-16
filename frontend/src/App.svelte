<script lang="typescript">
  import NavBar from './components/NavBar.svelte';
  import { RouterComponent } from './lib/router';
  import { router } from './routes';
  import { me } from './composables/user';

  const loading$ = me()
    .catch(() => {})
    .then(() => router.start());
</script>

<main>
  {#await loading$}
    <!-- empty -->
  {:then _}
    <div class="App--header">
      <NavBar></NavBar>
    </div>
    <div class="App--content">
      <RouterComponent {router}></RouterComponent>
    </div>
  {/await}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    width: 100vw;
  }

  .App--header {
    position: sticky;
    top: 0;
    z-index: 60;
  }

  .App--content {
    flex: 1;
    height: 100%;
  }
</style>