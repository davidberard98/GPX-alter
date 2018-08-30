import {} from "jasmine"
import {Section} from '../src/Section'
import {Point} from '../src/Point'
describe("Section", function () {
  it("works at the equator", function () {
    let sec = new Section();
    sec.topLat = 1;
    sec.leftLon = 0;
    sec.heightDegrees = 2;
    sec.width = 600;
    sec.height = 400;
    expect(sec.widthDegrees).toBe(3);
  });
  it('works at high latitudes', function () {
    let sec = new Section();
    sec.topLat = 61;
    sec.leftLon = 0;
    sec.heightDegrees = 2;
    sec.width = 600;
    sec.height = 400;
    expect(sec.widthDegrees).toBeCloseTo(6);
  });
  it('works at low latitudes', function() {
    let sec = new Section();
    sec.topLat = -59;
    sec.leftLon = 0;
    sec.heightDegrees = 2;
    sec.width = 600;
    sec.height = 400;
    expect(sec.widthDegrees).toBeCloseTo(6);
  });
  it('gets average latitude', function() {
    let sec = new Section();
    sec.topLat = 1;
    sec.leftLon = 0;
    sec.heightDegrees = 2;
    sec.width = 600;
    sec.height = 400;
    expect(sec.avgLat).toBe(0);
  });
  it("can convert", function() {
    let sec = new Section();
    sec.topLat = 1;
    sec.leftLon = 0;
    sec.heightDegrees = 2;
    sec.width = 100;
    sec.height = 100;
    let p1:Point = new Point(null);
    p1.lat = 0;
    p1.lon = 1;
    let conv:[number, number] = sec.convert(p1);
    expect(conv[0]).toBeCloseTo(50);
    expect(conv[1]).toBeCloseTo(50);
  });
});
