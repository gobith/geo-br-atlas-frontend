import { writable } from "svelte/store";

import polylabel from "polylabel";

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
    const path = new Path2D(area.d);
    const labelPoint = polylabel([area.polygon], 1.0);
    return {
      ...area,
      path,
      labelPoint: { x: labelPoint[0], y: labelPoint[1] },
    };
  });
  const islandAreas = mapData.islandAreas;
  const realmBorders = mapData.realmBorders;

  const bordersPath = new Path2D();
  const islandsPath = new Path2D();
  const woodsPath = new Path2D();
  const mountainsPath = new Path2D();
  const realmBordersPath = new Path2D();


  mapData.borders.forEach((border) => {
    bordersPath.addPath(new Path2D(border.d));
  });

  mapData.islandAreas.forEach((area) => {
    islandsPath.addPath(new Path2D(area.d));
  });

  mapData.woodAreas.forEach((area) => {
    woodsPath.addPath(new Path2D(area.d));
  });

  mapData.mountainAreas.forEach((area) => {
    mountainsPath.addPath(new Path2D(area.d));
  });

  realmBorders.forEach((rbs) => {
    rbs.borders.forEach((rb) => {
      const border = borders.find((b) => {return b.id === rb});
      console.log(border);
      realmBordersPath.addPath(new Path2D(border.d));
    })
  });

  return {
    borders,
    provinceAreas,
    islandAreas,
    realmBorders,
    bordersPath,
    islandsPath,
    woodsPath,
    mountainsPath,
    realmBordersPath,
  };
};
