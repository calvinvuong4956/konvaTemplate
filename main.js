// find elements
const stageContainer = document.getElementById("stage-container");
let stageContainerWidth = stageContainer.offsetWidth;
let stageContainerHeight = stageContainer.offsetHeight;
console.log(stageContainerWidth);
console.log(stageContainerHeight);

const circleButton = document.getElementById("circle-button");
console.log(circleButton);

// set default circle colour
let circleColour = "orange";

// 1. creating konva stage
const stage = new Konva.Stage({
  container: "konva-stage",
  width: stageContainerWidth,
  height: stageContainerHeight,
});

// create layer
const firstLayer = new Konva.Layer();

// create shape (circle)
// const circle = new Konva.Circle({
//   x: stage.width() / 2,
//   y: stage.height() / 2,
//   radius: 50,
//   fill: "orange",
// });

stage.add(firstLayer);

// add interaction to button
function drawNewCircle() {
  const circle = new Konva.Circle({
    x: stage.width() * Math.random(),
    y: stage.height() * Math.random(),
    radius: 65 * Math.random(),
    fill: circleColour,
  });
  firstLayer.add(circle);
}

circleButton.addEventListener("click", drawNewCircle);
