<script lang="ts">
  import areaSelection from "./area-selection-store";
</script>

{#if $areaSelection}
  <h1>{$areaSelection.id}</h1>
{/if}

<style>
  h1 {
    position: fixed;
    top: 20px;
    left: 20px;
  }
</style>
