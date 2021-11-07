export class Regent {
  id: string;
  name: string;
  domains: any;

  constructor(object: any) {
    this.id = object.id;
    this.name = object.name;
    this.domains = [];
  }

  printString() {
    return "Regent: " + this.name;
  }
}

export class Domain {
  id: string;
  name: string;
  gold: number;
  owner: any;
  provinces: any;
  holdings: any;

  constructor(object: any) {
    this.id = object.id;
    this.name = object.name;
    this.gold = object.gold;
    this.provinces = [];
    this.holdings = [];
  }

  printString() {
    return "Domain: " + this.name;
  }
}

export class Province {
  id: string;
  areaId: any;
  name: string;
  level: number;
  loyalty: string;
  sourceRating: number;
  terrain: any;
  owner: any;
  holdings: any;

  constructor(object: any) {
    this.id = object.id;
    this.areaId = object.areaId;
    this.name = object.name;
    this.level = object.level;
    this.loyalty = object.loyalty;
    this.sourceRating = object.sourceRating;
    this.terrain = object.terrain;
    this.holdings = [];
  }

  printString() {
    return "Province: " + this.name;
  }

  addHolding(holding) {
    this.holdings.push(holding)
  }
}
export class Holding {
  id: string;
  province: any;
  level: number;
  type: string;
  owner: any;

  constructor(object: any) {
    this.id = object.id;
    this.level = object.level;
    this.type = object.type;
  }

  printString() {
    return "Holding: " + this.type + " / " + this.level;
  }
}

export class World {
  uuidToObjectMapping: any;
  nameToObjectMapping: any;
  regents: any;
  domains: any;
  provinces: any;
  holdings: any;

  constructor(worldData: any) {
    this.uuidToObjectMapping = {};
    this.nameToObjectMapping = {};
    this.regents = [];
    this.domains = [];
    this.provinces = [];
    this.holdings = [];

    worldData.regents.forEach((data) => {
      const object = new Regent(data);
      this.uuidToObjectMapping[object.id] = object;
      this.nameToObjectMapping[object.name] = object;
      this.regents.push(object);
    });

    worldData.domains.forEach((data) => {
      const object = new Domain(data);
      this.uuidToObjectMapping[object.id] = object;
      this.nameToObjectMapping[object.name] = object;
      this.domains.push(object);
    });

    worldData.provinces.forEach((data) => {
      const object = new Province(data);
      this.uuidToObjectMapping[object.id] = object;
      this.nameToObjectMapping[object.name] = object;
      this.provinces.push(object);
    });

    worldData.holdings.forEach((data) => {
      const object = new Holding(data);
      this.uuidToObjectMapping[object.id] = object;
      this.holdings.push(object);
    });

    worldData.domains.forEach((data) => {
      const object = this.uuidToObjectMapping[data.id];
      object.owner = this.uuidToObjectMapping[data.owner];
      if (object.owner) {object.owner.domains.push(object)};
    });

    worldData.provinces.forEach((data) => {
      const object = this.uuidToObjectMapping[data.id];
      object.owner = this.uuidToObjectMapping[data.owner];
      object.owner.provinces.push(object)
    });

    worldData.holdings.forEach((data) => {
      const object = this.uuidToObjectMapping[data.id];
      object.owner = this.uuidToObjectMapping[data.owner];
      object.owner.holdings.push(object);
      object.province = this.uuidToObjectMapping[data.province];
      object.province.holdings.push(object)
    });
  }

  provinceInfoForArea(area) {
    if (area.provinceInfo) {
      return area.provinceInfo;
    }
    const province = this.provinces.find((province) => {
      if (province.areaId) {
        return (
          province.areaId.x === area.center.x &&
          province.areaId.y === area.center.y
        );
      } else {
        return false;
      }
    });

    if (!province) {
      area.provinceInfo = { stats: "8/2", name: "XXX" };
    } else {
      area.provinceInfo = {
        stats: `${province.level}/${province.sourceRating}`,
        name: province.name,
      };
    }

    return area.provinceInfo;
  }
}
