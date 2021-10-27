<script lang="ts">
  import { onMount } from "svelte";

  import areaSelection from "../../stores/area-selection-store";
  import { resize, scale, offset, clicked } from "../../stores/world-state";

  export let map;

  const updateSelection = (point) => {
    let selectedArea;
    const canvas = document.getElementById("areas-canvas") as HTMLCanvasElement;
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

  const updateAreaSelection = (selection) => {
    const canvas = document.getElementById("areas-canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx.scale(1, 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate($offset.x, $offset.y);
    ctx.scale($scale, $scale);

    let area = map.provinceAreas.find((area) => {
      return area === selection;
    });

    if (area) {
      ctx.fillStyle = "rgba(44, 50, 134, 0.37)";
      ctx.fill(area.path);
    }

    // ctx.fillStyle = "rgba(44, 50, 134, 0.37)";

    // map.areas.forEach((area) => {
    //   ctx.fill(area.path);
    // })

     //ctx.shadowColor = "red";
     //ctx.shadowBlur = 15;

   
    // ctx.strokeStyle="rgba(255 , 255, 255 , 0.1)";
    // ctx.lineWidth = 600;
    // map.areas.forEach((area) => {
    //   ctx.stroke(area.path)});

    // ctx.strokeStyle="rgba(255 , 255, 255 , 0.1)";
    // ctx.lineWidth = 200;
    // map.areas.forEach((area) => {
    //   ctx.stroke(area.path)});
    
   // ctx.strokeStyle="rgba(255 , 255, 255 , 0.1)";
    // ctx.lineWidth = 50;
    // map.areas.forEach((area) => {
     //  ctx.stroke(area.path)});

  ctx.shadowColor = "rgba(255 , 255, 255 , 0.6)";
    ctx.shadowBlur = 100;
    ctx.fillStyle = "#F2F2F2";
    map.provinceAreas.forEach((area) => {
      ctx.fill(area.path);
     
      
    });


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

    clicked.subscribe((point) => {
      updateSelection(point);
    });

    areaSelection.subscribe((selection) => {
      updateAreaSelection(selection);
    });
  });
</script>

<canvas id="areas-canvas" width="10000" height="10000" />

<style>
  canvas {
    background-color: #006994;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
