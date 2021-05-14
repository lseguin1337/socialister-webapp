<script lang="typescript">
  import { user } from '../composables/user';
</script>

<nav>
  <div class="Nav--left Nav--block">
  </div>

  <div class="Nav--middle Nav--block">
    <a class="Nav--menu" href="#/home">Home</a>
    {#if $user}
      <a class="Nav--menu" href="#/overview">Overview</a>
      <a class="Nav--menu" href="#/settings">Settings</a>
    {/if}
  </div>

  <div class="Nav--right Nav--block">
    {#if $user}
      <a class="Nav--menu Account" href="#/account">
        <img class="UserPicture" alt="user" src="https://media-exp1.licdn.com/dms/image/C4D03AQFep90NzFnV7Q/profile-displayphoto-shrink_400_400/0/1594025388118?e=1626307200&v=beta&t=Gumaay8Ftv6iAaY9NN-RD-TUnO_D3SN7UgRp1XB-_ZI" />
        { $user.username }
      </a>
    {:else}
      <a class="Nav--menu" href="#/login">Login</a>
    {/if}
  </div>
</nav>

<style>
  nav {
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 1px solid rgb(209, 214, 223);
  }

  .Account {
    display: flex;
    justify-content: center;
    justify-items: center;
  }

  .UserPicture {
    border-radius: 50%;
    width: 20px;
    margin-right: 5px;
  }

  .Nav--block {
    display: flex;
  }

  .Nav--menu {
    padding: 5px 10px;
    color: #000;
    margin: 5px;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.2s, color 0.2s;
  }

  .Nav--menu:hover {
    color: rgb(75, 138, 231);
    background-color: rgba(0,0,0,0.05);
    border-radius: 8px;
  }
</style>