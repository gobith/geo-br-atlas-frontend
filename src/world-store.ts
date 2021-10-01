import { writable } from "svelte/store";

const world = writable(null);

fetch("/world")
  .then((response) => response.json())
  .then((worldData) => {
    world.set(worldData);
  });

export default world;