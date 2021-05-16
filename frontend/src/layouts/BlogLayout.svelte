<script>
  import Container from "../components/Container.svelte";
</script>

<Container>
  <div class="BlogLayout--container">
    <slot></slot>
  </div>
</Container>

<style>
  .BlogLayout--container {
    padding: 0px 20px;
  }
</style>