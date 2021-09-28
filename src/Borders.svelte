<script lang="ts">
  import { onMount } from "svelte";

  export let map;

  const drawBorders = (borders) => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([10, 6]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray";
    ctx.fillStyle = "gray";

    borders.forEach((border) => {
      ctx.stroke(border.path);
    });
  };

  onMount(() => {
    drawBorders(map.borders);
  });
</script>

<canvas id="canvas" width="10000" height="10000" />

<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
