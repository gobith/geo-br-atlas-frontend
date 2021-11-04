<script lang="ts">
  import { onMount } from "svelte";
  import {
    resize,
    scale,
    offset,
    settings,
    zoom,
  } from "../../stores/world-state";
  import { provinceInfoForArea } from "../../stores/world-store";

  export let map;

  const drawDescriptions = () => {
    const canvas = document.getElementById(
      "description-canvas"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    canvas.height = $resize.height;
    canvas.width = window.innerWidth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate($offset.x, $offset.y);
    ctx.scale($scale, $scale);

    if ($settings.showProvinceInfo) {
      drawProvinceInfo(ctx);
    }

    ctx.restore();
  };

  onMount(() => {
    drawDescriptions();

    resize.subscribe((resize) => {
      drawDescriptions();
    });

    scale.subscribe((scaleNumber) => {
      drawDescriptions();
    });

    offset.subscribe((offsetPoint) => {
      drawDescriptions();
    });

    settings.subscribe((settingsObject) => {
      drawDescriptions();
    });
  });

  const drawProvinceInfo = (ctx) => {
    switch ($zoom) {
      case 1:
        drawProvinceInfoZoom1(ctx);
        break;
      case 2:
        drawProvinceInfoZoom2(ctx);
        break;
      case 3:
        drawProvinceInfoZoom3(ctx);
        break;
      case 4:
        drawProvinceInfoZoom3(ctx);
        break;
      case 5:
        drawProvinceInfoZoom5(ctx);
        break;
      case 6:
        drawProvinceInfoZoom6(ctx);
        break;
      case 7:
        drawProvinceInfoZoom7(ctx);
        break;
      case 8:
        drawProvinceInfoZoom8(ctx);
        break;
    }
  };

  const drawProvinceInfoZoom9 = (ctx) => {
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 25px calibri";
    map.provinceAreas.forEach((area) => {
      const provinceInfo = provinceInfoForArea(area);

      ctx.fillText(provinceInfo.stats, area.labelPoint.x, area.labelPoint.y);
      // ctx.strokeText(
      //   provinceInfo.name,
      //   area.center.x ,
      //   area.center.y - 5
      // );
      // ctx.fillText(
      //   `${area.center.x}@${area.center.y}`,
      //   area.center.x ,
      //   area.center.y + 20
      // );
    });
  };

  const drawProvinceInfoZoom1 = (ctx) => {};
  const drawProvinceInfoZoom2 = (ctx) => {};

  const drawProvinceInfoZoom3 = (ctx) => {
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 25px calibri";
    map.provinceAreas.forEach((area) => {
      const provinceInfo = provinceInfoForArea(area);

      ctx.fillText(area.id, area.labelPoint.x, area.labelPoint.y);
    });
  
  };

  const drawProvinceInfoZoom4 = (ctx) => {
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 25px calibri";
    map.provinceAreas.forEach((area) => {
      const provinceInfo = provinceInfoForArea(area);

      ctx.fillText(provinceInfo.stats, area.labelPoint.x, area.labelPoint.y);
    });
  };
  const drawProvinceInfoZoom5 = (ctx) => {
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 12px calibri";

    map.provinceAreas.forEach((area) => {
      const provinceInfo = provinceInfoForArea(area);

      ctx.fillText(
        provinceInfo.name,
        area.labelPoint.x,
        area.labelPoint.y - 10
      );
    });

    ctx.font = "bold 16px calibri";
    map.provinceAreas.forEach((area) => {
      const provinceInfo = provinceInfoForArea(area);

      ctx.fillText(
        provinceInfo.stats,
        area.labelPoint.x,
        area.labelPoint.y + 10
      );
    });
  };
  const drawProvinceInfoZoom6 = (ctx) => {
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 8px calibri";

    map.provinceAreas.forEach((area) => {
      const provinceInfo = provinceInfoForArea(area);

      ctx.fillText(
        provinceInfo.name,
        area.labelPoint.x,
        area.labelPoint.y - 8
      );
    });

    ctx.font = "bold 16px calibri";
    map.provinceAreas.forEach((area) => {
      const provinceInfo = provinceInfoForArea(area);

      ctx.fillText(
        provinceInfo.stats,
        area.labelPoint.x,
        area.labelPoint.y + 8
      );
    });
    
  };
  const drawProvinceInfoZoom7 = (ctx) => {};
  const drawProvinceInfoZoom8 = (ctx) => {};
</script>

<canvas id="description-canvas" />

<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
