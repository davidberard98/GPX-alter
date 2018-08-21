import { Point } from './Point'
export class Segment {
  private points: Array<Point>;
  readGpx(gpxString: string): void {

  }
  writeGpx(): string {
    // TODO
    return "a";
  }
  add(x: number, y: number): number {
    return x+y;
  }
}
