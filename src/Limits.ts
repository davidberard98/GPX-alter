export class Limits {
  minimum: number;
  maximum: number;
  constructor(minimum_init: number = Number.MAX_VALUE
    , maximum_init: number = Number.MIN_VALUE) {
    this.minimum = minimum_init;
    this.maximum = maximum_init;
  }
  add(x: number): void;
  add(x: Limits): void;
  add(x: any):void {
    if(typeof x === 'number') {
      this.minimum = (x < this.minimum ? x : this.minimum);
      this.maximum = (x > this.maximum ? x : this.maximum);
    } else {
      this.minimum = (x.minimum < this.minimum ? x.minimum : this.minimum);
      this.maximum = (x.maximum > this.maximum ? x.maximum : this.maximum);
    }
  }
}
