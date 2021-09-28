<script lang="ts">
  import map from "./map-store";
  import Borders from "./Borders.svelte";
  import AreaSelection from "./AreaSelection.svelte";
  import Info from "./Info.svelte";
</script>

{#if $map}
  <div class="map-container">
	<Borders map={$map} />
	<AreaSelection map={$map} />
	<Info />
  </div>
{/if}

<style>
  .map-container {
    position: relative;
	
  }
</style>
