<script lang="ts">
  import map from "../../stores/map-store";
  import world from "../../stores/world-store";
  import { attachEvents , detachEvents } from "../../stores/world-state";
  import Borders from "./Borders.svelte";
  import AreaSelection from "./AreaSelection.svelte";
  import AreaDescriptions from "./AreaDescriptions.svelte";
  import Info from "./Info.svelte";
  import { onMount , onDestroy} from "svelte";
import { detach } from "svelte/internal";

  onMount(() => {
    
    attachEvents();
  });

  onDestroy(() => {
    detachEvents()
  })

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
