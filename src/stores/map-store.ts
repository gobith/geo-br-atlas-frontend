import { writable } from "svelte/store";

const map = writable(null);

fetch("/map")
  .then((response) => response.json())
  .then((mapData) => {
    map.set(mapFor(mapData));
  });

export default map;

const mapFor = (mapData) => {


  const borders = new Path2D();

  mapData.borders.forEach((border) => {
    borders.addPath(new Path2D(border.d));
  
  });

  const provinceAreas = mapData.provinceAreas.map((area) => {
    let path = new Path2D(area.d);
    return { ...area, path };
  });

  const islandAreas = mapData.islandAreas.map((area) => {
    let path = new Path2D(area.d);
    return { ...area, path };
  });
  
  const realmBorders = mapData.realmBorders;

  return { borders, provinceAreas, islandAreas, realmBorders };
};
