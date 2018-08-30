import {} from "jasmine"
import { SectionBuilder } from '../src/SectionBuilder'
import { Section } from '../src/Section'
import { Point } from '../src/Point'
describe("SectionBuilder", function () {
    it("initializes to zero", function () {
        let sb:SectionBuilder = new SectionBuilder(100, 100);
        let s:Section = sb.build();
        expect(s.widthDegrees).toBeCloseTo(0);
        expect(s.heightDegrees).toBeCloseTo(0);
    });
    it("works with a horizontal line", function() {
        let sb:SectionBuilder = new SectionBuilder(100, 100);
        let p1:Point = new Point(null);
        let p2:Point = new Point(null);
        [p1.lat, p1.lon] = [0, 0];
        [p2.lat, p2.lon] = [0, 1];
        sb.add(p1);
        sb.add(p2);
        let s:Section = sb.build();
        expect(s.widthDegrees).toBeCloseTo(1);
    });
    it("works with a vertical line", function() {
        let sb:SectionBuilder = new SectionBuilder(100, 100);
        let p1:Point = new Point(null);
        let p2:Point = new Point(null);
        [p1.lat, p1.lon] = [0, 0];
        [p2.lat, p2.lon] = [1, 0];
        sb.add(p1);
        sb.add(p2);
        let s:Section = sb.build();
        expect(s.heightDegrees).toBeCloseTo(1);
    });
});
