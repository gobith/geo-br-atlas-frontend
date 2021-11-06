export class Regent {
  id: string;
  name: string;

  constructor(object: any) {
    this.id = object.id;
    this.name = object.name;
  }

  printString() {
    return "Regent: " + this.name;
  }
}

export class Domain {
  id: string;
  name: string;
  gold: number;
  owner: string;

  constructor(object: any) {
    this.id = object.id;
    this.name = object.name;
    this.gold = object.gold;
    this.owner = object.owner;
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
  owner: string;

  constructor(object: any) {
    this.id = object.id;
    this.areaId = object.areaId;
    this.name = object.name;
    this.level = object.level;
    this.loyalty = object.loyalty;
    this.sourceRating = object.sourceRating;
    this.terrain = object.terrain;
    this.owner = object.owner;
  }

  printString() {
    return "Province: " + this.name;
  }
}

export class Holding {
  id: string;
  province: string;
  level: number;
  type: string;
  owner: string;

  constructor(object: any) {
    this.id = object.id;
    this.province = object.province;
    this.level = object.level;
    this.type = object.type;
    this.owner = object.owner;
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
