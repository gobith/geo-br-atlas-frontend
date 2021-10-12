<script lang="ts">
  export let province;

  let selectedLoyalty = province.loyalty;
  const loyalties = ["High", "Average", "Poor", "Rebellious"];
</script>

<div>
  <select name="loyalty" required bind:value={selectedLoyalty}>
    {#each loyalties as loyalty}
      <option value={loyalty}>{loyalty}</option>
    {/each}
  </select>
</div>

<style>
</style>
