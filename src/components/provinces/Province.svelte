<script lang="ts">
  import world from "../../stores/world-store";
  export let province;
</script>


  <td>{province.name}</td>
  <td>{province.level}</td>
  <td>{province.sourceRating}</td>
  <td>{$world.regents[province.ownership.owner].name}</td>
  <td>{$world.regents[province.ownership.ruler].name}</td>
  <td>{province.law}</td>
  <td>{province.guild}</td>
  <td>{province.temple}</td>
  <td>{province.source}</td>
  <td>{province.loyalty}</td>
  <td>{province.terrain.name}</td>

<style>
</style>
