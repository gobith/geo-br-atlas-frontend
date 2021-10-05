<script lang="ts">
  import { onMount } from "svelte";
  import { resize } from "./world-state";

  export let map;

  console.log(map);

  const drawBorders = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(1 , 1);

    ctx.setLineDash([0, 0]);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#cd9575";

    map.realmBorders.forEach((realmBorder) => {
      realmBorder.borders.forEach((borderId) => {
        const border = map.borders.find((border) => {return border.id === borderId});
        ctx.stroke(border.path)
      })
    })

    // ctx.setLineDash([0, 0]);
    // ctx.lineWidth = 2;
   

    // map.borders.forEach((border) => {
    //   ctx.stroke(border.path);
    // });

    ctx.setLineDash([10, 6]);
    ctx.lineWidth = 1;
    // ctx.strokeStyle = "gray";
   

    map.borders.forEach((border) => {
      ctx.stroke(border.path);
    });
  };

  onMount(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.height = window.innerHeight;
    canvas.width = 550;

    drawBorders();

    resize.subscribe((resize) => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      canvas.height = resize.height;
      canvas.width = 550;
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
