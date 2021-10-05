import { writable , get } from "svelte/store";


const world = writable(null);

fetch("/world")
  .then((response) => response.json())
  .then((worldData) => {
    world.set(worldData);
  });

export default world;



export const provinceStatsForArea = (area) => {

  if (!world) {return ''};
  const province = get(world).provinces.find((province) => {return province.areaId === area.id});
  return `${province.level}/${province.sourceRating}`

}