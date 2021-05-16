<script lang="typescript">
  export let router: any;

  $: route = router?.route;
</script>

<section>
  {#if $route}
    <svelte:component this={$route.Component} {...$route.props}></svelte:component>
  {/if}
</section>

<style>
</style>