import { Point } from './Point'
export class Segment {
  private points: Array<Point>;
  private title: string;
  constructor() {
    this.points = new Array();
  }
  readGpx(gpxString: string): void {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(gpxString, "text/xml");
    let trkpts:NodeListOf<Element> = xmlDoc.getElementsByTagName("trkpt");
    for(let i:number = 0;i<trkpts.length;++i) {
      this.points.push(new Point(trkpts[i]));
    }
  }
  writeGpx(): string {
    // TODO
    return "a";
  }
  add(x: number, y: number): number {
    return x+y;
  }
}
