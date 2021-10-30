import { writable } from "svelte/store";

const map = writable(null);

fetch("/map")
  .then((response) => response.json())
  .then((mapData) => {
    map.set(mapFor(mapData));
  });

export default map;

const mapFor = (mapData) => {

  const borders = mapData.borders;
  const provinceAreas = mapData.provinceAreas.map((area) => {
    let path = new Path2D(area.d);
    return { ...area, path };
  });
  const islandAreas = mapData.islandAreas;
  const realmBorders = mapData.realmBorders;

  const bordersPath = new Path2D();
  const islandsPath = new Path2D();

  mapData.borders.forEach((border) => {
    bordersPath.addPath(new Path2D(border.d));

  });

  mapData.islandAreas.forEach((area) => {
    islandsPath.addPath(new Path2D(area.d));

  });

  return { borders, provinceAreas, islandAreas, realmBorders, bordersPath, islandsPath };
};
