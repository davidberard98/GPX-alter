import {} from "jasmine"
import { Limits } from '../src/Limits'

describe("Limits", function () {
    it("initialized to integer limits by default", function () {
      let l:Limits = new Limits();
      expect(l.minimum).toBe(Number.MAX_VALUE);
      expect(l.maximum).toBe(Number.MIN_VALUE);
    });
    it("correctly handles different inputted limits", function() {
      let l:Limits = new Limits();
      l.add(5);
      l.add(6);
      expect(l.minimum).toBe(5);
      expect(l.maximum).toBe(6);
      l.add(5.5);
      expect(l.minimum).toBe(5);
      expect(l.maximum).toBe(6);
      l.add(100);
      expect(l.minimum).toBe(5);
      expect(l.maximum).toBe(100);
      l.add(4);
      expect(l.minimum).toBe(4);
      expect(l.maximum).toBe(100);
      l.add(55);
      expect(l.minimum).toBe(4);
      expect(l.maximum).toBe(100);
    });
    it("Adds other limits correctly", function() {
      let l1 = new Limits();
      let l2 = new Limits();
      l1.add(5);
      l1.add(6);
      l2.add(5.5);
      l2.add(6.5);
      l1.add(l2);
      expect(l1.minimum).toBe(5);
      expect(l1.maximum).toBe(6.5);
      l1 = new Limits();
      l2 = new Limits();
      l2.add(2);
      l1.add(l2);
      expect(l1.minimum).toBe(2);
      expect(l1.maximum).toBe(2);
    });
    it("correctly averages", function() {
      let l = new Limits();
      l.add(2);
      l.add(4);
      expect(l.avg()).toBe(3);
      l.add(10);
      expect(l.avg()).toBe(6);
    });
    it("gets the right range", function() {
      let l = new Limits();
      l.add(2);
      l.add(4);
      expect(l.range()).toBe(2);
      l.add(10);
      expect(l.range()).toBe(8);
    });
});
