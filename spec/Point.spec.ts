//import { DOMParser } from 'xmldom'
import * as DOMParser from "dom-parser"
import {} from "jasmine"
import { Point } from '../src/Point'

describe("Point", function () {
  it("can read a trkpt", function () {
    let trkptString:string = `   <trkpt lat="36.7711110" lon="-118.3518500">
    <ele>3126.2</ele>
    <time>2018-08-13T18:10:08Z</time>
    <extensions>
     <gpxtpx:TrackPointExtension>
      <gpxtpx:hr>112</gpxtpx:hr>
      <gpxtpx:cad>49</gpxtpx:cad>
     </gpxtpx:TrackPointExtension>
    </extensions>
   </trkpt>`;
    let parser:DOMParser = new DOMParser();
    let trkpt:Element = parser.parseFromString(trkptString, 'text/xml')
      .getElementsByTagName("trkpt")[0];
    //console.log(trkpt);
    let pt:Point = new Point(trkpt);

    expect(pt.time.getFullYear()).toBe(2018);
    expect(pt.time.getMonth()).toBe(7); // zero-indexed month smh
    expect(pt.time.getDate()).toBe(13);
    expect(pt.time.getSeconds()).toBe(8);

    expect(pt.lat).toBe(36.7711110);
    expect(pt.lon).toBe(-118.3518500);
    expect(pt.elevation).toBe(3126.2);

    let amt:number = 0;
    for(let x in pt.gpxtpx) {
      ++amt;
    }
    expect(amt).toBe(2);
  });
});
