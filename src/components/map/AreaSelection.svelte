<script lang="ts">
  import { onMount } from "svelte";

  import areaSelection from "../../stores/area-selection-store";
  import { resize, scale , offset} from "../../stores/world-state";

  export let map;

  const mouseclick = (event) => {
    let selectedArea;
    const canvas = document.getElementById("areas-canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    ctx.save();
    ctx.translate($offset.x, $offset.y);
    ctx.scale($scale, $scale);

    map.areas.forEach((area) => {
      if (ctx.isPointInPath(area.path, event.offsetX, event.offsetY)) {
        selectedArea = area;
      }
    });
    ctx.restore();
    areaSelection.set(selectedArea);
  };

  const updateAreaSelection = (selection) => {
    const canvas = document.getElementById("areas-canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx.scale(1, 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate($offset.x, $offset.y);
    ctx.scale($scale, $scale);

    let area = map.areas.find((area) => {
      return area === selection;
    });

    if (area) {
      ctx.fillStyle = "rgba(44, 50, 134, 0.37)";
      ctx.fill(area.path);
    }
    ctx.restore();
  };

  onMount(() => {
    const canvas = document.getElementById("areas-canvas") as HTMLCanvasElement;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    resize.subscribe((resize) => {
      const canvas = document.getElementById(
        "areas-canvas"
      ) as HTMLCanvasElement;
      canvas.height = resize.height;
      canvas.width = window.innerWidth;
      updateAreaSelection($areaSelection);
    });

    scale.subscribe((scaleNumber) => {
      updateAreaSelection($areaSelection);
    });

    offset.subscribe((offsetPoint) => {
      updateAreaSelection($areaSelection);
    });

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
