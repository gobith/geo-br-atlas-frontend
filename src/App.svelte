<script lang="ts">
  import map from "./map-store";
  import Map from "./Map.svelte";
</script>

{#if $map}
  <Map map={$map} />
{/if}

<style>
</style>
