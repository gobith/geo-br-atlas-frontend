import { writable, get } from "svelte/store";
import { Regent, Domain, Province, Holding , World} from "../domain/domain";

export const world = writable(null);

fetch("/world")
  .then((response) => response.json())
  .then((worldData) => {
    world.set(new World(worldData));
  });

export default world;



const loyalty = { High: "🙂", Average: "😐", Poor: "🙁", Rebellious: "😠" };

