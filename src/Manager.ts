import { Section } from './Section'
import { SectionBuilder } from './SectionBuilder'
import { drawer } from './Drawer'
import { Segment } from './Segment'

class Manager {
  private currentSection:Section;
  segments: Array<Segment>;
  getBaseSection(): Section {
    let builder:SectionBuilder = new SectionBuilder(drawer.width, drawer.height);
    for(let segment of this.segments) {
      for(let pt of segment.points) {
        builder.add(pt);
      }
    }
    return builder.build();
  }
  initialize(): void {
    this.currentSection = this.getBaseSection();
  }
  addSegment(s:Segment): void {
    this.segments.push(s);
  }
  onNewUpload(e: any): void {
    let s: Segment = new Segment();
    this.addSegment(s);
    let f = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function(ev:any) {
      s.readGpx(ev.target.result);
    }
    reader.readAsText(f);
  }
};

export let manager:Manager = new Manager();
