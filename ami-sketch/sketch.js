let socket;

function setup() {
  createCanvas(800, 800);
  socket = io.connect();
  socket.on('ami', onReceive);
}

function draw() {}

function onReceive(data) {
  console.log(data);
  background(250);

  for (let i = 0; i < data.length; i++) {
    fill(0, 0, 255);
    text(data[i].name, 100 + i * 100, 100 + Math.floor(i / 4) * 100);
    if (data[i].value == 'A') {
      fill(0, 255, 0);
      rect(100 + i * 100, 140 + Math.floor(i / 4) * 100, 100, 60);
      //write code for when people facing left
      //code for pose a
    } else if (data[i].value == 'B') {
      fill(255, 0, 0);
      rect(100 + i * 100, 140 + Math.floor(i / 4) * 100, 100, 60);
      //write code for when people facing right
      //code for pose b
    }
  }
}
