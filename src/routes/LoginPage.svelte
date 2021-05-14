<script lang="typescript">
  import Container from '../components/Container.svelte';

  import LoginForm from '../components/LoginForm.svelte';
  import { user } from '../composables/user';

  $: if ($user) location.href = '#/overview';
</script>

<div class="LoginPage--container">
  <Container width={400}>
    <LoginForm></LoginForm>
  </Container>
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