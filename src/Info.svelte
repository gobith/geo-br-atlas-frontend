<script lang="ts">
  import areaSelection from "./area-selection-store";
  import world from "./world-store";
  import { scale } from "./world-state";

  let province;

  areaSelection.subscribe((area) => {
    if (area) {
      province = $world.provinces.find((province) => {
        return province.areaId === area.id;
      });
    } else {
      province = null;
    }
  });
</script>

<div>
 <p>Scale: {$scale}</p>
  {#if $areaSelection}
    <p>{$areaSelection.id}</p>
  {/if}
  {#if province}
    <h1>{province.name} {province.level}/{province.sourceRating}</h1>
    <p>Owner: {$world.regents[province.ownership.owner].name}</p>
    <p>Ruler: {$world.regents[province.ownership.ruler].name}</p>
    
    <h3>Loyalty: {province.loyalty}</h3>

    <h3>Law: {province.law}</h3>

    {#each province.lawHoldings as each}
    <p>owner: {$world.regents[each.owner].name} ruler: {$world.regents[each.ruler].name} level: {each.level}</p>
    {/each}

    <h3>Guild: {province.guild}</h3>

    {#each province.guildHoldings as each}
    <p>owner: {$world.regents[each.owner].name} ruler: {$world.regents[each.ruler].name} level: {each.level}</p>
    {/each}

    <h3>Temple: {province.temple}</h3>

    {#each province.templeHoldings as each}
    <p>owner: {$world.regents[each.owner].name} ruler: {$world.regents[each.ruler].name} level: {each.level}</p>
    {/each}

    <h3>Source: {province.source}</h3>

    {#each province.sourceHoldings as each}
    <p>owner: {$world.regents[each.owner].name} ruler: {$world.regents[each.ruler].name} level: {each.level}</p>
    {/each}

    <h3>Terrain</h3>
    <p>{province.terrain.name}</p>

  {/if}
</div>

<style>
  div {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    min-width: 300px;
    border: 1px solid black;
    padding: 20px
  }
</style>
