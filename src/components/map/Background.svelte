<script lang="ts">
  import { onMount , onDestroy} from "svelte";
  import {
    resize,
    scale,
    offset,
    clicked,
    settings,
    selection,
    attachEvents,
    detachEvents,
  } from "../../stores/world-state";

  export let map;
  export let world;

  const heightDelta = 0;

  onMount(() => {
    const canvas = document.getElementById("canvas");
    attachEvents(canvas);

    resize.subscribe((resize) => {
      drawBackground();
    });

    scale.subscribe((scaleNumber) => {
      drawBackground();
    });

    offset.subscribe((offsetPoint) => {
      drawBackground();
    });

    clicked.subscribe((point) => {
      updateSelection(point);
    });

    selection.subscribe((sel) => {
      drawBackground();
    });

    settings.subscribe((sel) => {
      drawBackground();
    });
  });

  onDestroy(() => {
    const canvas = document.getElementById("canvas");
    detachEvents(canvas);
  });

  const shadowBlur = () => {
    if ($settings.shadowBlur) {
      return $scale;
    } else {
      0;
    }
  };

  const drawBackground = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    canvas.height = $resize.height;
    canvas.width = window.innerWidth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate($offset.x, $offset.y);
    ctx.scale($scale, $scale);

    ctx.lineCap = "round";

    drawIslands(ctx);
    drawWoods(ctx);
    drawMountains(ctx);

    if ($settings.showRealms) {
      drawRealmBorders(ctx);
    }

    if ($settings.showProvinces) {
      drawProvinceBorders(ctx);
    }

    drawSelection(ctx);

    ctx.restore();
  };

  const drawIslands = (ctx) => {
    ctx.shadowColor = "rgba(255 , 255, 255 , 0.4)";
    ctx.shadowBlur = 50 * shadowBlur();
    ctx.fillStyle = "#EEE8AA";
    ctx.fill(map.islandsPath);
    ctx.shadowBlur = 0;
  };

  const drawWoods = (ctx) => {
    ctx.globalAlpha = 0.8;
    ctx.shadowColor = "darkgreen";
    ctx.shadowBlur = 50 * shadowBlur();
    ctx.clip(map.islandsPath);
    ctx.fillStyle = "#228B22";
    ctx.strokeStyle = "darkgreen";
    ctx.lineWidth = 2;
    ctx.fill(map.woodsPath);
    ctx.stroke(map.woodsPath);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  };

  const drawMountains = (ctx) => {
    ctx.globalAlpha = 0.3;
    ctx.shadowColor = "#654321";
    ctx.shadowBlur = 50 * shadowBlur();
    ctx.fillStyle = "#796342";
    ctx.strokeStyle = "#796342";
    ctx.lineWidth = 2;
    ctx.fill(map.mountainsPath);
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  };

  const drawRealmBorders = (ctx) => {
    ctx.strokeStyle = "#654321";
    ctx.lineWidth = 2;
    ctx.stroke(map.realmBordersPath);
    ctx.lineWidth = 4;
    ctx.stroke(map.islandsPath);
    ctx.shadowBlur = 0;
  };

  const drawProvinceBorders = (ctx) => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#654321";
    ctx.setLineDash([10, 6]);
    ctx.lineWidth = 1;
    ctx.stroke(map.provinceBordersPath);
    ctx.setLineDash([0, 0]);
    ctx.stroke(map.islandsPath);
    ctx.shadowBlur = 0;
  };

  const drawSelection = (ctx) => {
    ctx.setLineDash([0, 0]);
    ctx.shadowBlur = 0;
    let area = map.provinceAreas.find((area) => {
      return area === $selection;
    });

    if (area) {
      ctx.lineWidth = 3;
      ctx.fillStyle = "rgba(151, 103, 56 , 0.9);";
      ctx.strokeStyle = "rgba(151, 103, 56 , 0.9);";
      ctx.fill(area.path);
      ctx.stroke(area.path);
      navigator.clipboard.writeText(`${area.center.x} @ ${area.center.y}`);
    }
  };

  const updateSelection = (point) => {
    let selectedProvince;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    ctx.save();
    ctx.translate($offset.x, $offset.y);
    ctx.scale($scale, $scale);

    map.provinceAreas.forEach((area) => {
      if (ctx.isPointInPath(area.path, point.x, point.y - heightDelta)) {
        selectedProvince = area;
      }
    });
    ctx.restore();
    selection.set(selectedProvince);
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
