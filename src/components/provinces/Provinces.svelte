<script lang="ts">
  import world from "../../stores/world-store";
  import Province from "./Province.svelte";

  let selection;

  const updateSelection = (province) => {
    if (selection === province) {
      selection = null;
    } else {
      selection = province;
    }
  };
</script>

{#if $world}
  <table>
    <tr>
      <th>Province</th>
      <th>Level</th>
      <th>SR</th>
      <th>Owner</th>
      <th>Ruler</th>
      <th>Law</th>
      <th>Guild</th>
      <th>Temple</th>
      <th>Source</th>
      <th>Loyalty</th>
      <th>Terrain</th>
    </tr>

    {#each $world.provinces as province}
      <tr
        class="row"
        class:active={selection === province}
        on:click={updateSelection(province)}
      >
        <Province {province} />
      </tr>
    {/each}
  </table>
{/if}

<style>
  table {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }

  .row:hover {
    background-color: lightblue;
    cursor: pointer;
  }

  .active {
    background-color: lightblue;
  }
</style>
