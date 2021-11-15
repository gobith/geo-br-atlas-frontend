export class Session {
  uuidToObjectMapping: any;
  namedEntities: any;
  regents: any;
  domains: any;
  provinces: any;
  holdings: any;
  provinceAreas: any;
  islandsPath: Path2D;
  provinceBordersPath: Path2D;
  woodsPath: Path2D;
  mountainsPath: Path2D;

  constructor(data: any) {
    this.uuidToObjectMapping = data.uuidToObjectMapping;
    this.regents = data.regents;
    this.domains = data.domains;
    this.provinces = data.provinces;
    this.holdings = data.holdings;
    this.provinceAreas = data.provinceAreas;
    this.islandsPath = data.islandsPath;
    this.provinceBordersPath = data.provinceBordersPath;
    this.woodsPath = data.woodsPath;
    this.mountainsPath = data.mountainsPath;
  }
}
