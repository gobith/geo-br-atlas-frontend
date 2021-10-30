<script lang="ts">
  import map from "../../stores/map-store";

  import world from "../../stores/world-store";
  import {
    attachEvents,
    detachEvents,
    resetResize,
  } from "../../stores/world-state";

  import Background from "./Background.svelte";
  import AreaDescriptions from "./AreaDescriptions.svelte";
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
    <Background map={$map} />
    <AreaDescriptions map={$map} />
  {/if}
{/if}

<style>
</style>
