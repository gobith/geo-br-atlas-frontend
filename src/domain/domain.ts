import utils from "svg-path-reverse";
import type { Polygon } from "./polygon";

export class Node {
  id: number;
  pathToNodeMapping: any;

  constructor(id: number) {
    this.id = id;
    this.pathToNodeMapping = new Map();
  }

  borderA(border) {
    this.pathToNodeMapping.set(border.b, {
      border: border,
      direction: "forward",
    });
  }

  borderB(border) {
    this.pathToNodeMapping.set(border.a, {
      border: border,
      direction: "reverse",
    });
  }

  initialFillPath(array, leftOver, nodes) {
    leftOver.delete(this.id);
    const [nextNodeId] = this.pathToNodeMapping.keys();

    const object = this.pathToNodeMapping.get(nextNodeId);
    const d = object.border.initialD(object.direction);
    array.push(d);
    const nextNode = nodes.get(nextNodeId);
    nextNode.fillPath(array, this.id, leftOver, this.id, nodes);
  }

  fillPath(array, prevNodeId, leftOver, beginNodeId, nodes) {
    if (this.id === beginNodeId) {
      return;
    }
    leftOver.delete(this.id);
    this.pathToNodeMapping.forEach((object, nextNodeId) => {
      if (nextNodeId !== prevNodeId) {
        const d = object.border.followingD(object.direction);
        array.push(d);

        const nextNode = nodes.get(nextNodeId);
        nextNode.fillPath(array, this.id, leftOver, beginNodeId, nodes);
      }
    });
  }
}

export class Border {
  id: number;
  a: any;
  b: any;
  d: string;

  constructor(data: any) {
    this.id = data.id;
    this.a = data.a;
    this.b = data.b;
    this.d = data.d;
  }

  initialD(direction) {
    if (direction === "forward") {
      return this.d;
    } else {
      return utils.reverse(this.d);
    }
  }

  followingD(direction) {
    if (direction === "forward") {
      return this.d.replace("M", "L");
    } else {
      return utils.reverse(this.d).replace("M", "L");
    }
  }
}

export class ProvinceArea {
  borders: [];
  path: Path2D;
  province: Province;
  labelPoint: any;
  polygon: Polygon;

  constructor(object: any) {
    this.borders = object.borders;
   
  }
}

export class RealmArea {
  path: Path2D;
  domain: Domain;
  labelPoint: any;

  constructor(domainObject: Domain) {
    this.domain = domainObject;
  }
}

export class Loyalty {
  constructor() {}
}

export class LoyaltyAverage extends Loyalty {
  constructor() {
    super();
  }

  smiley() {
    return "😐";
  }
}

export class LoyaltyHigh extends Loyalty {
  constructor() {
    super();
  }

  smiley() {
    return "🙂";
  }
}

export class LoyaltyPoor extends Loyalty {
  constructor() {
    super();
  }

  smiley() {
    return "🙁";
  }
}

export class LoyaltyRebellious extends Loyalty {
  constructor() {
    super();
  }

  smiley() {
    return "😠";
  }
}

const loyaltyClasses = {
  High: LoyaltyHigh,
  Average: LoyaltyAverage,
  Poor: LoyaltyPoor,
  Rebellious: LoyaltyRebellious,
};

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
    if (this.hasProvinces()) {
      return "Realm";
    } else {
      return "Domain";
    }
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
    return this.owner;
  }

  hasProvinces() {
    return this.provinces.length > 0;
  }

  stats() {
    return `${this.level()}/${this.sourceRating()}`;
  }

  level() {
    return this.provinces
      .map((province) => province.level)
      .reduce((a, b) => {
        return a + b;
      });
  }

  sourceRating() {
    return this.provinces
      .map((province) => province.sourceRating)
      .reduce((a, b) => {
        return a + b;
      });
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
  provinceAreas: any;
  descriptionArea: any;

  constructor(object: any) {
    super(object);
    this.areaId = object.areaId;
    this.name = object.name;
    this.level = object.level;
    this.loyalty = new loyaltyClasses[object.loyalty]();
    this.sourceRating = object.sourceRating;
    this.terrain = object.terrain;
    this.holdings = [];
    this.provinceAreas = [];
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
    return this.provinceAreas;
  }

  addToAreas(areaCollection) {
    this.provinceAreas.forEach((area) => {
      areaCollection.push(area);
    });
  }

  regent() {
    if (this.owner) {
      return this.owner.regent();
    } else {
      return null;
    }
  }

  domain() {
    return this.owner;
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
