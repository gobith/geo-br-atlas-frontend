<script lang="ts">
  import map from "../../stores/map-store";
  import world from "../../stores/world-store";
  import { attachEvents } from "../../stores/world-state";
  import Borders from "./Borders.svelte";
  import AreaSelection from "./AreaSelection.svelte";
  import AreaDescriptions from "./AreaDescriptions.svelte";
  import Info from "./Info.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    attachEvents();
  });
</script>

{#if $map}
  {#if $world}
    <div class="map-container">
      <Borders map={$map} />
      <AreaDescriptions map={$map} />
      <AreaSelection map={$map} />
    </div>
    <Info />
  {/if}
{/if}

<style>
  .map-container {
    position: relative;
  }
</style>
