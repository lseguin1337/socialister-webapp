<script lang="typescript">
  import BoardLayout from "../layouts/BoardLayout.svelte";

  export let pop: any;
</script>

<BoardLayout>
  <div>
    Population PageId { JSON.stringify(pop) }
  </div>
</BoardLayout>

<style>
</style>