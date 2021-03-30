import "../sass/main.scss";

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
