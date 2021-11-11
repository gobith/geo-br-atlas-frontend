export class Entity {
  id: string;

  constructor(object: any) {
    this.id = object.id;
  }

  isRegent() {
    return false;
  }
  isDomain() {
    return false;
  }
  isProvince() {
    return false;
  }
  isHolding() {
    return false;
  }

  areas() {
    return [];
  }
}

export class Regent extends Entity {
  name: string;
  domains: any;

  constructor(object: any) {
    super(object);
    this.name = object.name;
    this.domains = [];
  }

  typeString() {
    return "Regent";
  }

  isRegent() {
    return true;
  }

  areas() {
    const areas = [];

    this.domains.forEach((domain) => {
      domain.addToAreas(areas);
    });

    return areas;
  }
}

export class Domain extends Entity {
  name: string;
  gold: number;
  owner: any;
  provinces: any;
  holdings: any;

  constructor(object: any) {
    super(object);
    this.name = object.name;
    this.gold = object.gold;
    this.provinces = [];
    this.holdings = [];
  }

  typeString() {
    return "Domain";
  }

  isDomain() {
    return true;
  }

  areas() {
    const areas = [];
    this.addToAreas(areas);
    return areas;
  }

  addToAreas(areaCollection) {
    this.provinces.forEach((province) => {
      province.addToAreas(areaCollection);
    });
  }

  regent() {
    return this.owner
  }
}

export class Province extends Entity {
  areaId: any;
  name: string;
  level: number;
  loyalty: string;
  sourceRating: number;
  terrain: any;
  owner: any;
  holdings: any;
  area: any;

  constructor(object: any) {
    super(object);
    this.areaId = object.areaId;
    this.name = object.name;
    this.level = object.level;
    this.loyalty = object.loyalty;
    this.sourceRating = object.sourceRating;
    this.terrain = object.terrain;
    this.holdings = [];
  }

  typeString() {
    return "Province";
  }

  isProvince() {
    return true;
  }

  stats() {
    return `${this.level}/${this.sourceRating}`;
  }

  areas() {
    const areas = [];
    this.addToAreas(areas);
    return areas;
  }

  addToAreas(areaCollection) {
    if (this.area) {
      areaCollection.push(this.area);
    }
  }

  regent() {
    if (this.owner) {
      return this.owner.regent();
    } else {
      return null;
    }
  }
}
export class Holding extends Entity {
  province: any;
  level: number;
  type: string;
  owner: any;

  constructor(object: any) {
    super(object);
    this.level = object.level;
    this.type = object.type;
  }

  typeString() {
    return "Holding";
  }

  isHolding() {
    return true;
  }
}

export class World {
  uuidToObjectMapping: any;
  namedEntities: any;
  regents: any;
  domains: any;
  provinces: any;
  holdings: any;

  constructor(worldData: any) {
    this.uuidToObjectMapping = {};
    this.namedEntities = [];
    this.regents = [];
    this.domains = [];
    this.provinces = [];
    this.holdings = [];

    worldData.regents.forEach((data) => {
      const object = new Regent(data);
      this.uuidToObjectMapping[object.id] = object;
      this.namedEntities.push(object);
      this.regents.push(object);
    });

    worldData.domains.forEach((data) => {
      const object = new Domain(data);
      this.uuidToObjectMapping[object.id] = object;
      this.namedEntities.push(object);
      this.domains.push(object);
    });

    worldData.provinces.forEach((data) => {
      const object = new Province(data);
      this.uuidToObjectMapping[object.id] = object;
      this.namedEntities.push(object);
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
      if (object.owner) {
        object.owner.domains.push(object);
      }
    });

    worldData.provinces.forEach((data) => {
      const object = this.uuidToObjectMapping[data.id];
      object.owner = this.uuidToObjectMapping[data.owner];
      object.owner.provinces.push(object);
    });

    worldData.holdings.forEach((data) => {
      const object = this.uuidToObjectMapping[data.id];
      object.owner = this.uuidToObjectMapping[data.owner];
      object.owner.holdings.push(object);
      object.province = this.uuidToObjectMapping[data.province];
      object.province.holdings.push(object);
    });

    this.namedEntities.sort(function (a, b) {
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
