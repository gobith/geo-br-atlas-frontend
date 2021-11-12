import { writable } from "svelte/store";
import { Regent, Domain, Province, Holding, Border } from "../domain/domain";
import { Session } from "../domain/session";

const session = writable(null);

export default session;

const urls = ["world", "map"];

Promise.all(urls.map((url) => fetch(url)))
  .then((resp) => Promise.all(resp.map((r) => r.json())))
  .then((result) => {
    session.set(createSession(result[0], result[1]));
  });

const createSession = (worldData, mapData) => {

  console.log(mapData);

  const data = {
    uuidToObjectMapping: {},
    namedEntities: [],
    regents: [],
    domains: [],
    provinces: [],
    holdings: [],
    borders: mapData.borders.map(border => new Border(border)),
    islandsPath: new Path2D(),
    woodsPath: new Path2D(),
    mountainsPath: new Path2D(),
  };

  worldData.regents.forEach((objectData) => {
    const object = new Regent(objectData);
    data.uuidToObjectMapping[object.id] = object;
    data.namedEntities.push(object);
    data.regents.push(object);
  });

  worldData.domains.forEach((objectData) => {
    const object = new Domain(objectData);
    data.uuidToObjectMapping[object.id] = object;
    data.namedEntities.push(object);
    data.domains.push(object);
  });

  worldData.provinces.forEach((objectData) => {
    const object = new Province(objectData);
    data.uuidToObjectMapping[object.id] = object;
    data.namedEntities.push(object);
    data.provinces.push(object);
  });

  worldData.holdings.forEach((objectData) => {
    const object = new Holding(objectData);
    data.uuidToObjectMapping[object.id] = object;
    data.holdings.push(object);
  });

  worldData.domains.forEach((objectData) => {
    const object = data.uuidToObjectMapping[objectData.id];
    object.owner = data.uuidToObjectMapping[objectData.owner];
    if (object.owner) {
      object.owner.domains.push(object);
    }
  });

  worldData.provinces.forEach((objectData) => {
    const object = data.uuidToObjectMapping[objectData.id];
    object.owner = data.uuidToObjectMapping[objectData.owner];
    object.owner.provinces.push(object);
  });

  worldData.holdings.forEach((objectData) => {
    const object = data.uuidToObjectMapping[objectData.id];
    object.owner = data.uuidToObjectMapping[objectData.owner];
    object.owner.holdings.push(object);
    object.province = data.uuidToObjectMapping[objectData.province];
    object.province.holdings.push(object);
  });

  data.namedEntities.sort(function (a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  mapData.islandAreas.forEach((area) => {
    data.islandsPath.addPath(new Path2D(area.d));
  });

  mapData.woodAreas.forEach((area) => {
    data.woodsPath.addPath(new Path2D(area.d));
  });

  mapData.mountainAreas.forEach((area) => {
    data.mountainsPath.addPath(new Path2D(area.d));
  });

  console.log(data.borders[0].path);
  console.log(data.borders[0].reversePath);
  console.log(data, new Session(data));
  return new Session(data);
};
