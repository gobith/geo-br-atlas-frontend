<script lang="ts">
  import world from "../../stores/world-store";
  import LoyaltyScroller from "../loyalty/LoyaltyScroller.svelte";
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
  <td><LoyaltyScroller province={province} /></td>
  <td>{province.terrain.name}</td>

<style>
</style>
