import { writable } from "svelte/store";

const map = writable(null);

fetch("/map")
  .then((response) => response.json())
  .then((mapData) => {
    map.set(mapFor(mapData));
  });

export default map;

const mapFor = (mapData) => {
  const borders = mapData.borders.map((border) => {
    let path = new Path2D(border.d);
    return { ...border, path };
  });

  const areas = mapData.areas.map((area) => {
    let path = new Path2D(area.d);
    return {...area , path};
  });

  const realmBorders = mapData.realmBorders;
  return {borders , areas, realmBorders}
};
