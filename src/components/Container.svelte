<script lang="typescript">
  export let width: number = -1;

  function computeStyle(width: number) {
    if (width === -1)
      return "";
    return `max-width: ${width}px`;
  }
</script>

<div class="Container">
  <div class="Container--limit" style="{ computeStyle(width) }">
    <slot></slot>
  </div>
</div>

<style>
  .Container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .Container--limit {
    width: 100%;
    max-width: 900px;
  }
</style>