var express = require('express');
var app = express();
var http = require('http').createServer(app);
const options = {
  /* ... */
};

http.listen(process.env.PORT || 3000, process.env.IP, () =>
  console.log('listening on *:3000')
);

let dataToSendToMax = { model1: 0, model2: 0, model3: 0 };
let startDataSend = true;

app.use('/', express.static('public'));
app.use(
  '/posenet-classification',
  express.static('posenet-neural-network-classification')
);
app.use(
  '/handpose-classification',
  express.static('handpose-neural-network-classification')
);
app.use(
  '/facemesh-classification',
  express.static('facemesh-neural-network-classification')
);
app.use(
  '/posenet-regression',
  express.static('posenet-neural-network-regression')
);
app.use(
  '/handpose-regression',
  express.static('handpose-neural-network-regression')
);
app.use(
  '/facemesh-regression',
  express.static('facemesh-neural-network-regression')
);

const io = require('socket.io')(http, options);
io.on('connection', socket => {
  console.log(socket.id);
  socket.on('disconnect', () => console.log(`${socket} disconnected`));
  socket.on('posenet', data => {
    dataToSendToMax.model1 = data[0].label;
  });
  socket.on('handpose', data => {
    dataToSendToMax.model2 = data[0].label;
  });
  socket.on('facemesh', data => {
    dataToSendToMax.model3 = data[0].label;
  });
  if (startDataSend) {
    setInterval(() => {
      socket.broadcast.emit('max', dataToSendToMax);
    }, 100);
    startDataSend = false;
  }
});
