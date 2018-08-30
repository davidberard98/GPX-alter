import { Point } from './Point'
export class Section {
  /**
   * A latitude and longitude range representing a "window" and solid angle
   * which will be projected onto a canvas. In order to provide data on widths
   * heights and conversions from 3d to 2d coordinates, width and height of
   * the resulting window must be given.
   */
  topLat:number;
  leftLon:number;
  heightDegrees:number;
  width:number;
  height:number;
  getWidthDegrees(heightDegrees:number): number {
    const avgLat:number = this.topLat-heightDegrees/2;
    return heightDegrees*this.width/(Math.cos(avgLat*Math.PI/180)*this.height);
  }
  getHeightDegrees(widthDegrees:number): number {
    // binary search
    let minDeg:number = 0;
    let maxDeg:number = 170;
    for(let i = 0;i<1000;++i) {
      const wd:number = this.getWidthDegrees((minDeg+maxDeg)/2);
      if(wd < widthDegrees) minDeg = wd;
      else maxDeg = wd;
    }
    return (minDeg+maxDeg)/2;
  }
  get avgLat():number {
    return this.topLat-this.heightDegrees/2;
  }
  get widthDegrees():number {
    return this.getWidthDegrees(this.heightDegrees);
  }
    /*
  set widthDegrees(deg:number):void {
  } */
  // TODO: add the functionality for building the bounding box..
  //
  //
  convert(p:Point):[number, number] {
    const x: number = (p.lon-this.leftLon)*this.width/this.widthDegrees;
    const y: number = (this.topLat-p.lat)*this.height/this.heightDegrees;
    return [x, y];
  }
};
