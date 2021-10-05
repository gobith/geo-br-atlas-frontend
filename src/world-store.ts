import { writable , get } from "svelte/store";


const world = writable(null);

fetch("/world")
  .then((response) => response.json())
  .then((worldData) => {
    world.set(worldData);
  });

export default world;



export const provinceInfoForArea = (area) => {



  const province = get(world).provinces.find((province) => {return province.areaId === area.id});

  if (!province) {return {stats: '' , name: ''}};

  return {stats: `${province.level}/${province.sourceRating}` , name: province.name}

}