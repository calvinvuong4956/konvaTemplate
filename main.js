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

// handles when users change the size of window
function resizeHandler() {
  stage.width(stageContainer.offsetWidth);
  stage.height(stageContainer.offsetHeight);
}
// attach to resize event
window.addEventListener("resize", resizeHandler);

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

// ==============================================================================================

// Drawing Feature
// Feature Analysis
//     1. User Goal
//  Draw something. Make a mark, express creativity.
//     2. Represented Model
//  Cursor on the canvas | Defined canvas | Brush On | Brush Type Select | Colour? Its own feature?
//     3. Behaviour (methodically how does it work?)
//  move cursor over canvas, press mousebutton down, move mouse, release mousebutton
//     4. Implemented Model (technically how does it work?)
//  Konva Free Drawing Tutorial Code
//  Create a new line when mousebutton down, add to that line when mouse moves.
//     5. Interaction with other Features
//  Colour | Images for Brush | Eraser | Uploaded Images

// track when button is held
// Boolean
let isDrawing = false;
let lastLine;

// User presses mousebutton
function drawMouseDown() {
  isDrawing = true;
  const pos = stage.getPointerPosition();
  lastLine = new Konva.Line({
    stroke: "cyan",
    strokeWidth: 14,
    lineCap: "round",
    lineJoin: "round",
    points: [pos.x, pos.y, pos.x, pos.y],
  });
  firstLayer.add(lastLine);
}
// add function to mousedown event
stage.on("mousedown", drawMouseDown);

// User moves their mouse
function drawMouseMove() {
  // don't run if NOT drawing
  if (isDrawing === false) {
    return;
  }
  // if isDrawing is TRUE
  const pos = stage.getPointerPosition();
  let newPoints = lastLine.points().concat([pos.x, pos.y]);
  lastLine.points(newPoints);
}
stage.on("mousemove", drawMouseMove);

// User releases mousebutton
function drawMouseUp() {
  isDrawing = false;
}
// stage.on("mouseup", drawMouseUp);
window.addEventListener("mouseup", drawMouseUp);

// ---------------------------------------------------------------------------------------
// Import Image Function
// HTML "File" Input
// add image to konva as an image-object

const imgUpload = document.getElementById("img-upload");
// save last image
let lastImageUploaded = null;

// Function for saving/storing image
function storeUploadedImage(e) {
  lastImageUploaded = URL.createObjectURL(e.target.files[0]);
  console.log(lastImageUploaded);
  addImageURLToCanvas(lastImageUploaded);
}
imgUpload.addEventListener("change", storeUploadedImage);

// Function for add image to Canvas
function addImageURLToCanvas(url) {
  const imgObject = new Image();
  imgObject.onload = () => {
    //this will run when image is loaded
    const konvaImage = new Konva.Image({
      x: stage.width() / 2 - imgObject.width / 2,
      y: stage.height() / 2,
      image: imgObject,
      width: imgObject.width,
      height: imgObject.height,
    });
    firstLayer.add(konvaImage);
  };
  imgObject.src = url;
}

// REDO/UNDO Function
