import { writable, get } from "svelte/store";

const world = writable(null);

fetch("/world")
  .then((response) => response.json())
  .then((worldData) => {
    world.set(worldData);
  });

const loyalty = { High: "🙂", Average: "😐", Poor: "🙁", Rebellious: "😠" };

export default world;

export const provinceInfoForArea = (area) => {
  const province = get(world).provinces.find((province) => {
    if (province.areaId) {
      return (
        province.areaId.x === area.center.x &&
        province.areaId.y === area.center.y
      );
    } else {
      false;
    }
  });

  if (!province) {
    return { stats: "8/2", name: "XXX" };
  }

  //  ${loyalty[province.loyalty]}
  return {
    stats: `${province.level}/${province.sourceRating}`,
    name: province.name,
  };
};

export const provinceForArea = (area) => {
  return get(world).provinces.find((province) => {
    return province.areaId === area.id;
  });
};
