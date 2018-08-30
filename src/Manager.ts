import { Section } from './Section'
import { SectionBuilder } from './SectionBuilder'
import { Drawer } from './Drawer'
import { Segment } from './Segment'

class Manager {
  private currentSection:Section;
  private drawer:Drawer;
  segments: Array<Segment> = new Array();
  getBaseSection(): Section {
    let builder:SectionBuilder = new SectionBuilder(this.drawer.width, this.drawer.height);
    for(let segment of this.segments) {
      for(let pt of segment.points) {
        builder.add(pt);
      }
    }
    return builder.build();
  }
  initialize(): void {
    this.drawer = new Drawer();
    this.currentSection = this.getBaseSection();
    console.log("init: cs " + this.currentSection.leftLon+ " , " + this.currentSection.widthDegrees + " " + this.drawer.width + " " + this.drawer.height);
  }
  render(): void {
    if(this.currentSection == null) {
      this.initialize();
    }
    for(let s of this.segments) {
      this.drawer.beginPath();
      this.drawer.moveTo(this.currentSection.convert(s.points[0]));
      for(let i=1;i<s.points.length;++i) {
        this.drawer.lineTo(this.currentSection.convert(s.points[i]));
      }
      this.drawer.stroke();
    }
    console.log("!!");
    this.drawer.update();
  }
  addSegment(s:Segment): void {
    this.segments.push(s);
  }
  onNewUpload(e: any): void {
    let s: Segment = new Segment();
    this.addSegment(s);
    let f = e.target.files[0];
    let reader = new FileReader();
    let self = this;
    reader.onload = function(ev:any) {
      s.readGpx(ev.target.result);
      self.render();
    }
    reader.readAsText(f);
  }
};

export let manager:Manager = new Manager();
