import { writable, get } from "svelte/store";
import { World} from "../domain/domain";

export const world = writable(null);

fetch("/world")
  .then((response) => response.json())
  .then((worldData) => {
    const worldObject = new World(worldData);
    // console.log(worldObject);
    world.set(worldObject);
  });

export default world;



const loyalty = { High: "🙂", Average: "😐", Poor: "🙁", Rebellious: "😠" };

