import {} from "jasmine"
import {Section} from '../src/Section'
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
});
