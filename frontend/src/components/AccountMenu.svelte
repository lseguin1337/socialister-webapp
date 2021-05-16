<script lang="typescript">
  import { routeLink } from "../routes";
  import { logout } from "../composables/user";

  export let user: any;
  let isOpen = false;
</script>

<div class="AccountMenu--container">
  <div class="AccountMenu--button" on:click={() => isOpen = !isOpen}>
    <img class="UserPicture" alt="user" src="https://media-exp1.licdn.com/dms/image/C4D03AQFep90NzFnV7Q/profile-displayphoto-shrink_400_400/0/1594025388118?e=1626307200&v=beta&t=Gumaay8Ftv6iAaY9NN-RD-TUnO_D3SN7UgRp1XB-_ZI" />
    { user.username }
  </div>

  {#if isOpen}
    <div class="AccountMenu--backdrop" on:click={() => isOpen = !isOpen}></div>
    <div class="AccountMenu--dropdown">
      <csm-dropdown-list> 
        <csm-select-item left-icon="user" use:routeLink={'account'}>My Account</csm-select-item>
        <csm-select-item left-icon="quantify" use:routeLink={'overview'}>Analyse</csm-select-item>
        <csm-select-divider></csm-select-divider>
        <csm-select-item left-icon="cancel" on:click={() => logout()}>Disconnect</csm-select-item>
      </csm-dropdown-list>
    </div>
  {/if}
</div>

<style>
  .AccountMenu--dropdown {
    position: absolute;
    width: 250px;
    top: 45px;
    right: 0px;
  }

  .AccountMenu--backdrop {
    position: fixed;
    background-color: rgba(255, 255, 255, 0.2);
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  .AccountMenu--dropdown,
  .AccountMenu--backdrop {
    z-index: 800;
  }

  .AccountMenu--container {
    position: relative;
    padding: 5px 10px;
    color: #000;
    margin: 5px;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.2s, color 0.2s;
    color: rgb(75, 138, 231);
  }

  .AccountMenu--container:hover {
    color: rgb(75, 138, 231);
    background-color: rgba(0,0,0,0.05);
    border-radius: 8px;
  }

  .AccountMenu--button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .UserPicture {
    border-radius: 50%;
    width: 20px;
    margin-right: 5px;
  }
</style>