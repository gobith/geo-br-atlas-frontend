<script lang="ts">
  import map from "../../stores/map-store";

  import world from "../../stores/world-store";
  import {
    attachEvents,
    detachEvents,
    resetResize,
  } from "../../stores/world-state";

  import Background from "./Background.svelte";
  import Borders from "./Borders.svelte";
  import AreaSelection from "./AreaSelection.svelte";
  import AreaDescriptions from "./AreaDescriptions.svelte";
  import Info from "./Info.svelte";
  import { onMount, onDestroy } from "svelte";

  onMount(() => {
    attachEvents();
    resetResize();
  });

  onDestroy(() => {
    detachEvents();
  });
</script>

{#if $map}
  {#if $world}
    <div class="map-container">
      <Background map={$map} />
      <!-- <Borders map={$map} />
      <AreaDescriptions map={$map} />
      <AreaSelection map={$map} /> -->
    </div>
   <!-- <Info /> -->
  {/if}
{/if}

<style>
  .map-container {
    position: relative;
  }
</style>
