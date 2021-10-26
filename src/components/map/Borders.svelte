<script lang="ts">
  import { onMount } from "svelte";
  import { resize, scale, offset } from "../../stores/world-state";
  import { provinceForArea } from "../../stores/world-store";

  export let map;
  export let singledots;

  console.log(map);

  const drawBorders = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate($offset.x, $offset.y);
    ctx.scale($scale, $scale);

    map.areas.forEach((area) => {
      const province = provinceForArea(area);
      if (province) {
        ctx.fillStyle = province.terrain.color;
        ctx.fill(area.path);
      }
    });

    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 4;
    map.borders.forEach((border) => {
      ctx.stroke(border.path);
    });

    ctx.fillStyle = "black";
    ctx.setLineDash([0, 0]);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#cd9575";

    map.realmBorders.forEach((realmBorder) => {
      realmBorder.borders.forEach((borderId) => {
        const border = map.borders.find((border) => {
          return border.id === borderId;
        });
        ctx.stroke(border.path);
      });
    });

    //ctx.setLineDash([10, 6]);
    ctx.lineWidth = 1;

    map.borders.forEach((border) => {
      ctx.stroke(border.path);
    });

    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";

    singledots.forEach((dot) => {
      console.log(dot);

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 20, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.restore();
  };

  onMount(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.height = window.innerHeight - 40;
    canvas.width = window.innerWidth - 40;

    drawBorders();

    resize.subscribe((resize) => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      canvas.height = resize.height;
      canvas.width = window.innerWidth;
      drawBorders();
    });

    scale.subscribe((scaleNumber) => {
      drawBorders();
    });

    offset.subscribe((offsetPoint) => {
      drawBorders();
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
