<script lang="ts">
  import areaSelection from "../../stores/area-selection-store";
  import world from "../../stores/world-store";

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

{#if $areaSelection}
  <div>
    <p>{$areaSelection.id}</p>

    {#if province}
      <h1>{province.name} {province.level}/{province.sourceRating}</h1>
      <p>Owner: {$world.regents[province.ownership.owner].name}</p>
      <p>Ruler: {$world.regents[province.ownership.ruler].name}</p>

      <h3>Loyalty: {province.loyalty}</h3>

      <h3>Law: {province.law}</h3>

      {#each province.lawHoldings as each}
        <p>
          owner: {$world.regents[each.owner].name} ruler: {$world.regents[
            each.ruler
          ].name} level: {each.level}
        </p>
      {/each}

      <h3>Guild: {province.guild}</h3>

      {#each province.guildHoldings as each}
        <p>
          owner: {$world.regents[each.owner].name} ruler: {$world.regents[
            each.ruler
          ].name} level: {each.level}
        </p>
      {/each}

      <h3>Temple: {province.temple}</h3>

      {#each province.templeHoldings as each}
        <p>
          owner: {$world.regents[each.owner].name} ruler: {$world.regents[
            each.ruler
          ].name} level: {each.level}
        </p>
      {/each}

      <h3>Source: {province.source}</h3>

      {#each province.sourceHoldings as each}
        <p>
          owner: {$world.regents[each.owner].name} ruler: {$world.regents[
            each.ruler
          ].name} level: {each.level}
        </p>
      {/each}

      <h3>Terrain</h3>
      <p>{province.terrain.name}</p>
    {/if}
  </div>
{/if}

<style>
  div {
    position: fixed;
    top: 40px;
    right: 0px;
    height: 100vh;
    background-color: rgba(255, 255, 255, 1);
    min-width: 300px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 30px;
  }
</style>
