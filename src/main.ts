import {Segment} from './Segment'
import { manager } from './Manager'

let canvas = document.getElementById("canvas");

function setupUploadButton(onchange:(() => void)|((e:any)=>void)):void {
  let btn = document.createElement("input");
  btn.setAttribute("type", "file");
  btn.addEventListener('change', onchange);

  let sandbox = document.getElementById("sandbox");
  sandbox.appendChild(btn);
}

function testGpxParse(): void {
  setupUploadButton(function() {
    let s: Segment = new Segment();
    let f = this.files[0];
    let reader = new FileReader();
    reader.onload = function(e:any) {
      console.log("!!");
      s.readGpx(e.target.result);
    };
    reader.readAsText(f);
  });
}

function testBasicRender(): void {
  setupUploadButton(function(e:any) {
    // necessary to maintain correct "this" in manager.onNewUpload()
    manager.onNewUpload(e);
  });
}

window.onload = testBasicRender;
