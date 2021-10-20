<script lang="ts">
  import { onMount } from "svelte";
  import { resize, scale, offset } from "../../stores/world-state";
  import { provinceInfoForArea } from "../../stores/world-store";

  export let map;

  const drawDescriptions = () => {
    const canvas = document.getElementById(
      "description-canvas"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate($offset.x, $offset.y);
    ctx.scale($scale, $scale);
    ctx.strokeStyle = "black";
    map.areas.forEach((area) => {
      const provinceInfo = provinceInfoForArea(area);

      const halfStatsWidth = ctx.measureText(provinceInfo.stats).width / 2;
      const halfTextWidth = ctx.measureText(provinceInfo.name).width / 2;

      ctx.strokeText(
        area.id,
        area.center.x ,
        area.center.y
      );

      ctx.strokeText(
        provinceInfo.stats,
        area.center.x - halfStatsWidth,
        area.center.y + 10
      );
      ctx.strokeText(
        provinceInfo.name,
        area.center.x - halfTextWidth,
        area.center.y - 5
      );
    });
    ctx.restore();
  };

  onMount(() => {
    const canvas = document.getElementById(
      "description-canvas"
    ) as HTMLCanvasElement;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    drawDescriptions();

    resize.subscribe((resize) => {
      const canvas = document.getElementById(
        "description-canvas"
      ) as HTMLCanvasElement;
      canvas.height = resize.height;
      canvas.width = window.innerWidth;
      drawDescriptions();
    });

    scale.subscribe((scaleNumber) => {
      drawDescriptions();
    });

    offset.subscribe((offsetPoint) => {
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
