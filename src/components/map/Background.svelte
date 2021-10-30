<script lang="ts">
  import { onMount } from "svelte";
  import areaSelection from "../../stores/area-selection-store";
  import {
    resize,
    scale,
    offset,
    clicked,
    settings,
  } from "../../stores/world-state";
  import { provinceForArea } from "../../stores/world-store";

  export let map;
  const heightDelta = 0;

  onMount(() => {
    resize.subscribe((resize) => {
      drawBackground();
    });

    drawBackground();

    scale.subscribe((scaleNumber) => {
      drawBackground();
    });

    offset.subscribe((offsetPoint) => {
      drawBackground();
    });

    clicked.subscribe((point) => {
      updateSelection(point);
    });

    areaSelection.subscribe((selection) => {
      drawBackground();
    });

    settings.subscribe((selection) => {
      drawBackground();
    });
  });

  const drawBackground = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    canvas.height = $resize.height;
    canvas.width = window.innerWidth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate($offset.x, $offset.y);
    ctx.scale($scale, $scale);

    drawIslands(ctx);
    if ($settings.showProvinces) {
      drawBorders(ctx);
    }
    drawSelection(ctx);

    ctx.restore();
  };

  const drawIslands = (ctx) => {
    ctx.shadowColor = "rgba(255 , 255, 255 , 0.6)";
    ctx.shadowBlur = 50 * $scale;
    ctx.fillStyle = "white";
    ctx.fill(map.islandsPath);
  };

  const drawBorders = (ctx) => {
    ctx.strokeStyle = "black";
    //ctx.setLineDash([10, 6]);
    ctx.lineWidth = 1;
    ctx.stroke(map.bordersPath);
  };

  const drawSelection = (ctx) => {
    let area = map.provinceAreas.find((area) => {
      return area === $areaSelection;
    });

    if (area) {
      ctx.lineWidth = 3;
      ctx.fillStyle = "rgba(44, 50, 134, 0.1)";
      ctx.strokeStyle = "rgba(44, 50, 134, 0.8)";
      ctx.fill(area.path);
      ctx.stroke(area.path);
    }
  };

  const updateSelection = (point) => {
    let selectedArea;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    ctx.save();
    ctx.translate($offset.x, $offset.y);
    ctx.scale($scale, $scale);

    map.provinceAreas.forEach((area) => {
      if (ctx.isPointInPath(area.path, point.x, point.y - heightDelta)) {
        selectedArea = area;
      }
    });
    ctx.restore();
    areaSelection.set(selectedArea);
  };
</script>

<canvas id="canvas" />

<style>
  canvas {
    background-color: #006994;
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
