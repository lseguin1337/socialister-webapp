<script lang="typescript">
  import BlogLayout from "../layouts/BlogLayout.svelte";
</script>

<BlogLayout>
  <div class="Article--container">
    <div class="Article">
      <h1>Welcome,</h1>
      <p>Socialister is a wanderfull website</p>
    </div>
  </div>
</BlogLayout>

<style>
  .Article--container {
    padding-top: 20px;
  }

  .Article {
    background-color: #fff;
    padding: 5px 30px;
    border-radius: 5px;
  }

</style>