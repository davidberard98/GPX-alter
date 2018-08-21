import {Segment} from './Segment'

function testGpxParse(): void {
  let btn = document.createElement("input");
  btn.setAttribute("type", "file");
  btn.addEventListener('change', function() {
    let s: Segment = new Segment();
    let f = this.files[0];
    let reader = new FileReader();
    reader.onload = function(e:any) {
      console.log("!!");
      s.readGpx(e.target.result);
    };
    reader.readAsText(f);
  });

  let sandbox = document.getElementById("sandbox");
  sandbox.appendChild(btn);
}

window.onload = testGpxParse;
