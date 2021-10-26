<script lang="ts">
  import map from "../../stores/map-store";
  import singledots from "../../stores/single-dots-store";
  import world from "../../stores/world-store";
  import {
    attachEvents,
    detachEvents,
    resetResize,
  } from "../../stores/world-state";
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

{#if $singledots}
  {#if $map}
    {#if $world}
      <div class="map-container">
        <Borders map={$map} singledots={$singledots} />
        <AreaDescriptions map={$map} />
        <AreaSelection map={$map} />
      </div>
      <Info />
    {/if}
  {/if}
{/if}

<style>
  .map-container {
    position: relative;
  }
</style>
