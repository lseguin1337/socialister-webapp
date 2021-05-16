<script lang="typescript">
  import Container from "../components/Container.svelte";
  import LeftNav from "../components/LeftNav.svelte";
</script>

<Container>
  <div class="BoardLayout--container">
    <div class="BoardLayout--left-menu">
      <LeftNav></LeftNav>
    </div>
    <div class="BoardLayout--content">
      <slot></slot>
    </div>
  </div>
</Container>

<style>
  .BoardLayout--container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 20px 0px;
  }

  .BoardLayout--left-menu {
    height: 100%;
  }

  .BoardLayout--content {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 10px;
    overflow: auto;
  }
</style>