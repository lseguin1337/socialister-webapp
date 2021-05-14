<script lang="typescript">
  import LoginForm from '../components/LoginForm.svelte';
  import { user } from '../composables/user';

  $: if ($user) location.href = '#/overview';
</script>

<div class="LoginPage--container">
  <LoginForm></LoginForm>
</div>

<style>
  .LoginPage--container {
    padding-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
</style>