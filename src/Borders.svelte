<script lang="ts">
  import { onMount } from "svelte";
  import { resize } from "./world-state";

  export let map;

  const drawBorders = (borders) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(0.3 , 0.3);
    ctx.setLineDash([10, 6]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray";
    ctx.fillStyle = "gray";

    borders.forEach((border) => {
      ctx.stroke(border.path);
    });
  };

  onMount(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.height = window.innerHeight;
    canvas.width = 550;

    drawBorders(map.borders);

    resize.subscribe((resize) => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      canvas.height = resize.height;
      canvas.width = 550;
      drawBorders(map.borders);
    });
  });
</script>

<canvas id="canvas" />

<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
