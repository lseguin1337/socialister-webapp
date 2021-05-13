<script lang="typescript">
  import { user } from '../composables/user';
</script>

<nav>
  <a href="#/home">Home</a>
  {#if !$user}
    <a href="#/login">Login</a>
  {:else}
    <a href="#/overview">Overview</a>
    <a href="#/settings">Settings</a>
  {/if}
</nav>

<style>
  nav {
    width: 100%;
    background-color: #000;
    display: flex;
    justify-content: center;
  }

  a {
    margin: 5px
  }
</style>