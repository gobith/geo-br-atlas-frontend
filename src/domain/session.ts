export class Session {
  uuidToObjectMapping: any;
  namedEntities: any;
  regents: any;
  domains: any;
  provinces: any;
  holdings: any;
  borders: any;
  provinceAreas: any;
  islandsPath: Path2D;
  woodsPath: Path2D;
  mountainsPath: Path2D;

  constructor(data: any) {
    this.uuidToObjectMapping = data.uuidToObjectMapping;
    this.regents = data.regents;
    this.domains = data.domains;
    this.provinces = data.provinces;
    this.holdings = data.holdings;
    this.borders = data.borders;
    this.islandsPath = data.islandsPath;
    this.woodsPath = data.woodsPath;
    this.mountainsPath = data.mountainsPath;
  }
}
