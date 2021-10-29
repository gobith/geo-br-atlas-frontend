<script lang="ts">
  import { onMount } from "svelte";
  import areaSelection from "../../stores/area-selection-store";
  import { resize, scale, offset, clicked } from "../../stores/world-state";
  import { provinceForArea } from "../../stores/world-store";

  export let map;


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
    drawBorders(ctx);
    drawSelection(ctx);

    ctx.restore();
  };

  const drawIslands = (ctx) => {
    ctx.shadowColor = "rgba(255 , 255, 255 , 0.6)";
    ctx.shadowBlur = 50 * $scale;
    ctx.fillStyle = "white";

    map.islandAreas.forEach((area) => {
      ctx.fill(area.path);
    });
  };

  const drawBorders = (ctx) => {
    ctx.strokeStyle = "black";
   //ctx.setLineDash([10, 6]);
    ctx.lineWidth = 1;
    ctx.stroke(map.borders);

    

  };

  const drawSelection = (ctx) => {
    let area = map.provinceAreas.find((area) => {
      return area === $areaSelection;
    });

    if (area) {
      ctx.fillStyle = "rgba(44, 50, 134, 0.37)";
      ctx.fill(area.path);
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
      if (ctx.isPointInPath(area.path, point.x, point.y - 40)) {
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
    top: 0;
    left: 0;
  }
</style>
