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
let amiData = [];

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
app.use('/ami', express.static('ami-sketch'));

const io = require('socket.io')(http, options);
io.on('connection', socket => {
  console.log(socket.id);
  socket.on('disconnect', () => {
    console.log(`${socket} disconnected`);
    let index = amiData.findIndex(person => person.socketid == socket.id);
    amiData.splice(index, 1);
  });
  console.log('help');
  socket.on('posenet', data => {
    // dataToSendToMax.model1 = data.data[0].label;
    // let index = amiData.findIndex(person => person.socketid == socket.id);
    // index === -1
    //   ? amiData.push({
    //       socketid: socket.id,
    //       value: data.data[0].label,
    //     })
    //   : (amiData[index] = {
    //       socketid: socket.id,
    //       value: data.data[0].label,
    //       name: data.data[0].name,
    //     });
  });
  socket.on('handpose', data => {
    // dataToSendToMax.model2 = data.data[0].label;
    // let index = amiData.findIndex(person => person.socketid == socket.id);
    // index === -1
    //   ? amiData.push({
    //       socketid: socket.id,
    //       value: data.data[0].label,
    //     })
    //   : (amiData[index] = {
    //       socketid: socket.id,
    //       value: data.data[0].label,
    //       name: data.data[0].name,
    //     });
  });
  socket.on('facemesh', data => {
    // dataToSendToMax.model3 = data.data[0].label;
    let index = amiData.findIndex(person => person.socketid == socket.id);
    index === -1
      ? amiData.push({
          socketid: socket.id,
          value: data.data[0].label,
        })
      : (amiData[index] = {
          socketid: socket.id,
          value: data.data[0].label,
          name: data.data[0].name,
        });
    // console.log(data);
  });
  if (startDataSend) {
    setInterval(() => {
      socket.broadcast.emit('max', dataToSendToMax);
      socket.broadcast.emit('ami', amiData);
    }, 100);
    startDataSend = false;
  }
});
