import { writable, get } from "svelte/store";
import world from "./world-store";

import polylabel from "polylabel";

const map = writable(null);

let doneFetch = false;
world.subscribe((worldData) => {
  if (!worldData) {
    return;
  }

  if (doneFetch) {
    return;
  }
  fetch("/map")
    .then((response) => response.json())
    .then((mapData) => {
      map.set(mapFor(mapData));
    });

  doneFetch = true;
});

export default map;

const mapFor = (mapData) => {
  const uuidToObjectMapping = get(world).uuidToObjectMapping;

  const borders = mapData.borders;
  const provinceBorders = mapData.provinceBorders;
  const islandAreas = mapData.islandAreas;
  const realmBorders = mapData.realmBorders;

  const provinceAreas = mapData.provinceAreas.map((areaData) => {
    const path = new Path2D(areaData.d);
    const labelPoint = polylabel([areaData.polygon], 1.0);
    const province = uuidToObjectMapping[areaData.province];

    const area = {
      ...areaData,
      path,
      province,
      labelPoint: { x: labelPoint[0], y: labelPoint[1] },
    };

    if (province) {
      province.area = area;
    }

    return area;
  });

  const provinceBordersPath = new Path2D();
  const islandsPath = new Path2D();
  const woodsPath = new Path2D();
  const mountainsPath = new Path2D();
  const realmBordersPath = new Path2D();

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
      const border = borders.find((b) => {
        return b.id === rb;
      });
      realmBordersPath.addPath(new Path2D(border.d));
    });
  });

  provinceBorders.forEach((pb) => {
    const border = borders.find((b) => {
      return b.id === pb;
    });
    provinceBordersPath.addPath(new Path2D(border.d));
  });

  console.log(borders[0]);

  return {
    borders,
    provinceBorders,
    provinceAreas,
    islandAreas,
    realmBorders,
    provinceBordersPath,
    islandsPath,
    woodsPath,
    mountainsPath,
    realmBordersPath,
  };
};
