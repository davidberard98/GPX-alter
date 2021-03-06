import { Point } from './Point'
import { Limits } from './Limits'
import { Section } from './Section'

export class SectionBuilder {
  /**
   * Aggregates points and produces a Section that is a minimum bounding
   * box around the given points
   */
  latLim:Limits = new Limits();
  lonLim:Limits = new Limits();
  width:number;
  height:number;
  constructor(width:number, height:number) {
    this.width = width;
    this.height = height;
  }
  add(p:Point):void {
    this.latLim.add(p.lat);
    this.lonLim.add(p.lon);
    if(p.lon+119 > 1 || p.lon+119 < 0) {
      console.log(p.lon);
    }
  }
  build():Section {
    let result:Section = new Section();
    result.width = this.width;
    result.height = this.height;
    result.topLat = this.latLim.maximum;
    result.leftLon = this.lonLim.minimum;
    //console.log("lon range " + this.lonLim.range()+ " dfl " + result.getHeightDegrees(this.lonLim.range()));
    
    const degreesFromLon:number = result.getHeightDegrees(this.lonLim.range());
    result.heightDegrees = Math.max(this.latLim.range(), degreesFromLon);
    return result;
  }
}
