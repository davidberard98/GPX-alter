export class Point {
  lat: number;
  lon: number;
  time: Date;
  elevation: number;
  gpxtpx: Object;

  constructor(trkpt: null);
  constructor(trkpt: Element);
  constructor(trkpt: any) { 
    if(typeof trkpt == 'object') {
      this.readXml(trkpt);
    }
  }
  readXml(trkpt: Element): void {
    this.lat = parseFloat(trkpt.getAttribute("lat"));
    this.lon = parseFloat(trkpt.getAttribute("lon"));
    this.elevation = parseFloat(trkpt.getElementsByTagName("ele")[0].textContent);
    let timeString:string = trkpt.getElementsByTagName("time")[0].textContent;
    this.time = new Date(timeString);

    let tpx:Element = trkpt.getElementsByTagName("gpxtpx:TrackPointExtension")[0];
    console.log(trkpt.getElementsByTagNameNS);
    //console.log(tpx);
    if(tpx) {
      this.gpxtpx = {}
      let children:any = tpx.children;
      //console.log(tpx.children);
      for(let i:number = 0;i<children.length;++i) {
        this.gpxtpx[children[i].tagName] = parseFloat(children[i].textContent);
      }
    }
  }
  writeXml():Element {
    // TODO
    let ans = new Element();
    return ans;
  }
}
