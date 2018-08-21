import {} from "jasmine"
import {Segment} from '../src/Segment'
let mseg = new Segment();
describe("A suite", function () {
    it("contains spec with an expectation", function () {
        expect(true).toBe(true);
    });
    it('adds numbers correctly', function () {
        expect(mseg.add(1, 2)).toBe(3);
    });
});
