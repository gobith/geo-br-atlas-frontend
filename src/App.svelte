<script lang="ts">
  import map from "./map-store";
  import world from "./world-store";
  import Borders from "./Borders.svelte";
  import AreaSelection from "./AreaSelection.svelte";
  import Info from "./Info.svelte";
  import { onMount } from "svelte";
  import { attachEvents } from "./world-state";

  onMount(() => {
    attachEvents();
  });
</script>

{#if $map}
  {#if $world}
    <div class="map-container">
      <Borders map={$map} />
      <AreaSelection map={$map} />
    </div>
    <Info />
  {/if}
{/if}

<style>
  :global(body) {
    width: 100vw;
    height: 100vh;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
  .map-container {
    position: relative;
  }
</style>
