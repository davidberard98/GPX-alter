export class Drawer {
  finalCanvas:HTMLCanvasElement;
  finalCtx:CanvasRenderingContext2D;
  canvas:HTMLCanvasElement;
  ctx:CanvasRenderingContext2D;
  width:number;
  height:number;

  constructor(finalCanvas:Element);
  constructor(finalCanvas:any) {
    this.finalCanvas = finalCanvas;
    if(finalCanvas != null && finalCanvas.getContext != null) {
      this.finalCtx = finalCanvas.getContext('2d');
      this.canvas = document.createElement("canvas");
      this.width = finalCanvas.width;
      this.height = finalCanvas.height;
      this.canvas.width = this.width;
      this.canvas.width = this.height;
    }
  }

  update():void {
    this.finalCtx.drawImage(this.canvas, 0, 0);
  }

  beginPath(): void {
    this.ctx.beginPath();
  }

  moveTo(x: number, y: number): void {
    this.ctx.moveTo(x, y);
  }

  lineTo(x: number, y: number): void {
    this.ctx.lineTo(x, y);
  }

  stroke():void {
    this.ctx.stroke();
  }

}

export let drawer:Drawer = new Drawer(document.getElementById("canvas"));
