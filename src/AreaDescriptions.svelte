<script lang="ts">
  import { onMount } from "svelte";
  import { resize } from "./world-state";
  import {provinceStatsForArea} from "./world-store";

  export let map;

  const drawDescriptions = () => {
      console.log("test");
    const canvas = document.getElementById("description-canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(1 , 1);
    ctx.strokeStyle = 'black';
    map.areas.forEach((area) => {
      const provinceStats = provinceStatsForArea(area);
      ctx.strokeText(provinceStats, area.center.x, area.center.y);
    });
  };

  onMount(() => {
    const canvas = document.getElementById("description-canvas") as HTMLCanvasElement;
    canvas.height = window.innerHeight;
    canvas.width = 550;

    drawDescriptions();

    resize.subscribe((resize) => {
      const canvas = document.getElementById("description-canvas") as HTMLCanvasElement;
      canvas.height = resize.height;
      canvas.width = 550;
      drawDescriptions();
    });
  });
</script>

<canvas id="description-canvas" />

<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
