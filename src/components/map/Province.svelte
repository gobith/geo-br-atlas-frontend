<script lang="ts">
  import { scale, offset } from "../../stores/world-state";
  export let province;
  export let session;

  const labelPoint = province.descriptionArea.labelPoint;
  $: top = $offset.y + labelPoint.y * $scale;
  $: left = $offset.x + labelPoint.x * $scale;
</script>

<div style="--top:{top};--left:{left}">{province.name}</div>

<style>
  div {
    position: absolute;
    top: calc(var(--top) * 1px);
    left: calc(var(--left) * 1px);
    color: black;
    background-color: transparent;
    text-align: center;
    cursor: pointer;
  }

  div:hover {
    color: red;
    font-weight: bold;
  }
</style>
