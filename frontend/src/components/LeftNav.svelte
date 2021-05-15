<script lang="typescript">
  import { routeLink } from '../routes';
</script>

<div class="LeftNav--container">
  <csm-select-item class="Menu" use:routeLink={'overview'} left-icon={'quantify'}>Overview</csm-select-item>
  <csm-select-divider></csm-select-divider>
  <csm-select-item class="Menu" use:routeLink={'stars'} left-icon={'favorite'}>Users Stars</csm-select-item>
  <csm-select-item class="Menu" use:routeLink={['population', { popId: 5 }]} left-icon={'segment'}>Population</csm-select-item>
  <csm-select-item class="Menu" use:routeLink={'rage'} left-icon={'rage-click'}>Haine</csm-select-item>
  <csm-select-divider></csm-select-divider>
  <csm-select-item class="Menu" use:routeLink={'settings'} left-icon={'settings'}>Settings</csm-select-item>
</div>

<style>
  .LeftNav--container {
    position: sticky;
    top: 75px;
  }

  .Menu {
    border-left: 0px solid rgba(75, 138, 231, 0);
    transition: color 0.2s;
  }

  .Menu:hover,
  .Menu:global(.route-active) {
    color: rgba(75, 138, 231, 1);
  }
</style>