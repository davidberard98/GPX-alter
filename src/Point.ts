export class Point {
  lat: number;
  lon: number;
  time: Date;
  elevation: number;
  gpxtpx: Object;

  constructor(trkpt: null);
  constructor(trkpt: Element);
  constructor(trkpt: any = null) { 
    if(trkpt != null) {
      this.readXml(trkpt);
    }
  }
  readXml(trkpt: Element): void {
    this.lat = parseFloat(trkpt.getAttribute("lat"));
    this.lon = parseFloat(trkpt.getAttribute("lon"));
    this.elevation = parseFloat(trkpt.getElementsByTagName("ele")[0].textContent);
    let timeString:string = trkpt.getElementsByTagName("time")[0].textContent;
    this.time = new Date(timeString);

    let tpx:Element = trkpt.getElementsByTagName("gpxtpxxTrackPointExtension")[0];
    console.log(tpx);
    if(tpx) {
      this.gpxtpx = {}
      for(let child = tpx.firstElementChild; child; child = child.nextElementSibling) {
        let tagName:string = child.tagName;
        if(tagName.substring(0, 7) === 'gpxtpxx') {
          tagName = tagName.substring(7, tagName.length);
          this.gpxtpx[tagName] = parseFloat(child.textContent);
        }
      }
    }
  }
  writeXml():Element {
    // TODO
    let ans = new Element();
    return ans;
  }
}
