import { Point } from './Point'
export class Segment {
  points: Array<Point>;
  private title: string;
  private color: string;
  constructor() {
    this.points = new Array();
  }
  readGpx(gpxString: string): void {
    // For simplicity, forget about gpxtpx namespace.
    gpxString = gpxString.split('<gpxtpx:').join('<gpxtpxx');
    gpxString = gpxString.split('</gpxtpx:').join('</gpxtpxx');
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(gpxString, "text/xml");
    let trkpts:NodeListOf<Element> = xmlDoc.getElementsByTagName("trkpt");
    for(let i:number = 0;i<trkpts.length;++i) {
      this.points.push(new Point(trkpts[i]));
    }
  }
  writeGpx(): string {
    // TODO
    let gpxString:string = "";
    gpxString = gpxString.replace("<gpxtpxx", "<gpxtpx:");
    gpxString = gpxString.replace("</gpxtpxx", "</gpxtpx:");
    return "a";
  }
  add(x: number, y: number): number {
    return x+y;
  }
}
