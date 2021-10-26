import { writable } from "svelte/store";

const singledots = writable(null);

fetch("/singledots")
  .then((response) => response.json())
  .then((sd) => {
    singledots.set(sd);
  });

export default singledots;
