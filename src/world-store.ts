import { writable, get } from "svelte/store";

const world = writable(null);

fetch("/world")
  .then((response) => response.json())
  .then((worldData) => {
    world.set(worldData);
  });


const loyalty = {'High': '🙂' , 'Average': '😐' , 'Poor': '🙁' , 'Rebellious': '😠'}

  export default world;

export const provinceInfoForArea = (area) => {
  const province = get(world).provinces.find((province) => {
    return province.areaId === area.id;
  });

  if (!province) {
    return { stats: "", name: "" };
  }

  return {
    stats: `${province.level}/${province.sourceRating} ${loyalty[province.loyalty]}`,
    name: province.name,
  };
};

export const provinceForArea = (area) => {
  return get(world).provinces.find((province) => {
    return province.areaId === area.id;
  });
};
