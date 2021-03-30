import "../scss/main.scss";
import * as Tone from "tone";
import "../HF_Fav.png";

let xs = [];
let screenWidth = window.innerWidth;

for (var i = 0; i <= screenWidth; i++) {
  xs.push(i);
}

let t = 0;

function animate() {
  let points = xs.map((x) => {
    let y = 25 + 5 * Math.sin((x + t) / 5);

    return [x, y];
  });

  let path =
    "M" +
    points
      .map((p) => {
        return p[0] + "," + p[1];
      })
      .join(" L");

  document.querySelector("path").setAttribute("d", path);

  t += 0.5;

  requestAnimationFrame(animate);
}

animate();

//sound
// create two monophonic synths
const trigger = document.querySelector("#wave");
const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
let playing = false;
trigger.addEventListener("click", () => {
  if (playing === false) {
    //play a note every quarter-note
    const loopA = new Tone.Loop((time) => {
      synthA.triggerAttackRelease("C2", "8n", time);
    }, "4n").start(0);
    //play another note every off quarter-note, by starting it "8n"
    const loopB = new Tone.Loop((time) => {
      synthB.triggerAttackRelease("C4", "16n", time);
    }, "4n").start("8n");
    // the loops start when the Transport is started
    Tone.Transport.start();
    // ramp up to 800 bpm over 10 seconds
    Tone.Transport.bpm.rampTo(130, 10);
    setTimeout(() => (playing = true), 2000);
  } else {
    Tone.Transport.stop();
    playing = false;
  }
});
