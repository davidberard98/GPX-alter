export class Drawer {
  finalCanvas:HTMLCanvasElement;
  finalCtx:CanvasRenderingContext2D;
  canvas:HTMLCanvasElement;
  ctx:CanvasRenderingContext2D;
  width:number;
  height:number;

  constructor(finalCanvas:any = document.getElementById('canvas')) {
    this.finalCanvas = finalCanvas;
    if(finalCanvas != null && finalCanvas.getContext != null) {
      this.finalCtx = finalCanvas.getContext('2d');
      this.canvas = document.createElement("canvas");
      this.width = finalCanvas.width;
      this.height = finalCanvas.height;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx = this.canvas.getContext('2d');
    } else {
      console.log("Cannot find finalCanvas");
    }
  }

  update():void {
    this.finalCtx.drawImage(this.canvas, 0, 0);
  }

  beginPath(): void {
    this.ctx.beginPath();
  }

  moveTo(pt:[number, number]): void {
    this.ctx.moveTo(pt[0], pt[1]);
  }

  lineTo(pt:[number, number]): void {
    this.ctx.lineTo(pt[0], pt[1]);
    console.log(pt);
  }

  setColor(color:string): void {
    this.ctx.strokeStyle = color;
  }

  stroke():void {
    this.ctx.stroke();
  }

}
