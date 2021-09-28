<script lang="ts">
  import areaSelection from "./area-selection-store";
  import { onMount } from "svelte";

  export let map;

  const mouseclick = (event) => {
    const canvas = document.getElementById("areas-canvas");
    const ctx = canvas.getContext("2d");
    map.areas.forEach((area) => {
      if (ctx.isPointInPath(area.path, event.offsetX, event.offsetY)) {
        areaSelection.set(area);
      }
    });
  };

  const updateAreaSelection = (selection) => {
    const canvas = document.getElementById("areas-canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let area = map.areas.find((area) => {
      return area === selection;
    });

    if (area) {
      ctx.fillStyle = "rgba(44, 50, 134, 0.37)";
      ctx.fill(area.path);
    }
  };

  onMount(() => {
    const canvas = document.getElementById("areas-canvas");
    canvas.addEventListener("click", mouseclick);
    areaSelection.subscribe((selection) => {
      updateAreaSelection(selection);
    });
  });
</script>

<canvas id="areas-canvas" width="10000" height="10000" />

<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
