<script lang="ts">
  import {
    resetResize,
    attachResizeEvent,
    detachResizeEvent,
  } from "../../stores/world-state";

  import { onMount, onDestroy } from "svelte";

  import Background from "./Background.svelte";
  import Descriptions from "./Descriptions.svelte";

  export let session;

  onMount(() => {
    attachResizeEvent();
    resetResize();
  });

  onDestroy(() => {
    detachResizeEvent();
  });
</script>

<Background {session} />
<Descriptions {session} />

<style>
</style>
