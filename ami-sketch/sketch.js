let socket;

function setup() {
  createCanvas(640, 480);
  socket = io.connect();
  socket.on('ami', onReceive);
}

function draw() {
  background(250);
}

function onReceive(data) {
  console.log(data);
  console.log(Object.keys(data));
}
