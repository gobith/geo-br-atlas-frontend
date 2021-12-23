<script lang="ts">
  import { hoverSelection, selection , cursor } from "../../stores/world-state";
  import ProvinceInfo from "./ProvinceInfo.svelte";

  let top = 0;
  let left = 0;
  let province;

  hoverSelection.subscribe((provinceOrNull) => {

    if ($selection) {return};
    province = provinceOrNull;

    // top = $cursor.y;
    // left = $cursor.x;
    top = 70;
    left = 10
  });


  selection.subscribe((selectedProvince) => {
    province = selectedProvince;

    // top = $cursor.y;
    // left = $cursor.x;
    top = 70;
    left = 10
  });

</script>

<div class:active={province} style="--top:{top};--left:{left}">
  {#if province}
    <ProvinceInfo {province} />
  {/if}
</div>

<style>
  div {
    position: absolute;
    display: none;
    top: calc(var(--top) * 1px);
    left: calc(var(--left) * 1px);
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
    text-align: center;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .active {
    display: block;
  }
</style>
