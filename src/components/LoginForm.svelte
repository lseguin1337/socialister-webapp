<script lang="typescript">
  import { login } from "../composables/user";

  let email: string;
  let password: string;
  let connection$: Promise<any>;

  function submit() {
    connection$ = login(email, password);
  }
</script>

<div class="LoginForm--container">
  <div class="LoginForm--entry">
    <label for="-1">Email:</label>
    <csm-input  placeholder="email" type="email" on:csmChange={(event) => email = event.detail.value}></csm-input>
  </div>
  
  <div class="LoginForm--entry">
    <label for="-1">Password:</label>
    <csm-input placeholder="password" type="password" on:csmChange={(event) => password = event.detail.value}></csm-input>
  </div>

  <div class="LoginForm--entry">
    <footer class="LoginForm--footer">
      {#if !connection$}
        <csm-button primary on:csmClick={submit}>Login</csm-button>
      {:else}
        <csm-spinner size="medium"></csm-spinner>
      {/if}
    </footer>
  </div>
</div>

<style>
  .LoginForm--container {
    width: 400px;
  }

  .LoginForm--footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 3px;
  }

  .LoginForm--entry {
    margin-bottom: 15px;
  }
</style>