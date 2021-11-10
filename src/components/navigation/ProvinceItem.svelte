<script lang="ts">
  import map from "../../stores/map-store";
  import { selection } from "../../stores/world-state";

  export let object;

 
</script>

<div>
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
