<!-- svelte-ignore a11y-missing-attribute -->
<script lang="typescript">
  import { user } from '../composables/user';
  import AccountMenu from './AccountMenu.svelte';
  import Container from './Container.svelte';
  import { routeLink, routing } from '../routes';
</script>

<div class="Nav--container" class:loading={$routing}>
  <Container>
    <nav>
      <div class="Nav--left Nav--block">
        <a class="Nav--menu WebSiteLogo" use:routeLink={'home'}>
          <img class="LogoIcon" alt="user" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Creative-Tail-People-man-2.svg/256px-Creative-Tail-People-man-2.svg.png" />
          <b>So</b>cialister
        </a>
      </div>

      <div class="Nav--middle Nav--block">
      </div>

      <div class="Nav--right Nav--block">
        {#if $user}
          <AccountMenu user={$user}></AccountMenu>
        {:else}
          <a class="Nav--menu signup" use:routeLink={'signup'}>Sign-up</a>
          <a class="Nav--menu" use:routeLink={'login'}>Login</a>
        {/if}
      </div>
    </nav>
  </Container>
</div>


<style>
  @keyframes loading {
    from { border-top-color: rgb(75, 138, 231); }
    to   { border-top-color: rgb(145, 175, 220); }
  }
  .Nav--container {
    width: 100%;
    background-color: #fff;
    display: flex;
    border-top: 4px solid rgb(75, 138, 231);
    border-bottom: 1px solid rgb(209, 214, 223);
    box-shadow: 0 1px 2px rgba(0,0,0,0.05),0 1px 4px rgba(0,0,0,0.05),0 2px 8px rgba(0,0,0,0.05);
  }

  .Nav--container.loading {
    animation: .5s linear 0s infinite alternate loading;
  }

  nav {
    padding: 5px 0px;
    justify-content: space-between;
    display: flex;
  }

  .WebSiteLogo {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
  }

  .LogoIcon {
    border-radius: 50%;
    width: 20px;
    margin-right: 5px;
  }

  .Nav--block {
    display: flex;
  }

  .Nav--menu {
    padding: 5px 10px;
    color: rgba(0,0,0,0.5);
    margin: 5px;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.2s, color 0.2s;
  }

  .Nav--menu.WebSiteLogo {
    color: #000;
  }

  .Nav--menu:global(.route-active):not(.WebSiteLogo) {
    color: rgb(75, 138, 231);
  }

  .Nav--menu:hover:not(.WebSiteLogo) {
    color: rgb(75, 138, 231);
    background-color: rgba(0,0,0,0.05);
    border-radius: 8px;
  }
</style>