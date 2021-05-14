<script lang="typescript">
  import { currentRoute } from './router';
</script>

<section>
  {#await $currentRoute?.component}
    <!-- nothing -->
  {:then Component}
    <Component {...$currentRoute.props}></Component>
  {:catch error}
    <p>error { error.message }</p>
  {/await}
</section>

<style>
</style>