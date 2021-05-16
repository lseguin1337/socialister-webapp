<script lang="typescript">
  import { login } from "../composables/user";

  let email: string;
  let password: string;
  let connection$: Promise<any>;
  let message: string;
  let toast: HTMLElement & { open: () => void };

  async function submit() {
    if (connection$) {
      return;
    }
    message = '';
    try {
      await (connection$ = login(email, password));
    } catch (err) {
      message = 'Not Authorized';
    } finally {
      connection$ = null;
      password = '';
    }  
  }

  $: message && toast?.open();
</script>

<csm-toast
  bind:this={toast}
  style="top: 80px; z-index: 90"
  timeout={3000}
  pause-on-hover={true}
  severity="error"
  display-close-icon={true}
>
  <div class="ErrorMessage">{ message }</div>
</csm-toast>


<div class="LoginForm--container" on:keypress={(e) => e.charCode === 13 && submit()}>
  <h1>Connexion</h1>

  <div class="LoginForm--entry">
    <label for="-1">Email:</label>
    <csm-input name="email" placeholder="email" type="email" value={email} on:csmChange={(event) => email = event.detail.value}></csm-input>
  </div>
  
  <div class="LoginForm--entry">
    <label for="-1">Password:</label>
    <csm-input name="password" placeholder="password" type="password" value={password} on:csmChange={(event) => password = event.detail.value}></csm-input>
  </div>

  <div class="LoginForm--entry">
    <footer class="LoginForm--footer">
      {#if !connection$}
        <csm-button primary on:csmClick={submit}>Login</csm-button>
      {:else}
        <csm-spinner size="small"></csm-spinner>
      {/if}
    </footer>
  </div>
</div>

<style>
  label {
    color: rgb(61, 61, 61);
  }

  .ErrorMessage {
    color: red;
  }

  .LoginForm--container {
    padding: 25px;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
  }

  .LoginForm--footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3px;
    height: 35px;
  }

  .LoginForm--entry {
    margin-bottom: 15px;
  }
</style>