<script lang="ts">

  import {
   
    resetResize,
    attachResizeEvent ,
    detachResizeEvent
  } from "../../stores/world-state";

  import { onMount, onDestroy } from "svelte";

  import Background from "./Background.svelte";
  import Descriptions from "./Descriptions.svelte";


  export let map;
  export let world;

 

onMount(() => {
  attachResizeEvent();
  resetResize();
});

onDestroy(() => {
  detachResizeEvent();
});

</script>

<Background map={map}  world={world} />
<Descriptions map={map}  world={world} />

<style>
</style>
