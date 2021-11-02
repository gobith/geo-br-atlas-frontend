<script lang="ts">
  import { onMount } from "svelte";
  import { resize, scale, offset, settings } from "../../stores/world-state";
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
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = 'bold 25px calibri';
    map.provinceAreas.forEach((area) => {
      const provinceInfo = provinceInfoForArea(area);

      ctx.fillText(
        provinceInfo.stats,
        area.center.x ,
        area.center.y + 0
      );
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
</script>

<canvas id="description-canvas" />

<style>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
