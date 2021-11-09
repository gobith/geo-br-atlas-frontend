<script lang="ts">
  import map from "../../stores/map-store";
  import { provinceSelection } from "../../stores/world-state";

  export let object;

  const clicked = () => {
    const area = $map.provinceAreas.find((area) => {
      if (object.areaId) {
        return (
          object.areaId.x === area.center.x && object.areaId.y === area.center.y
        );
      } else {
        return false;
      }
    });

    provinceSelection.set(area);
  };
</script>

<div on:click={clicked}>
  <div class="title">
    <h2>{object.name}</h2>
    <h2>{object.stats()}</h2>
    <h3>{object.typeString()}</h3>
  </div>
</div>

<style>
  .title {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
  }
  h2 {
    margin: 0 0 0.5em 0;
    font-size: 16px;
  }
  h3 {
    margin: 0 0 0.5em 0;
    font-size: 8px;
    text-transform: uppercase;
    text-align:end
  }
</style>
