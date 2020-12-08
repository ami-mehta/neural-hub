var express = require('express');
var app = express();
var http = require('http').createServer(app);
const options = {
  /* ... */
};

http.listen(process.env.PORT || 3000, process.env.IP, () =>
  console.log('listening on *:3000')
);

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
  socket.on('posenet', data => socket.broadcast.emit('posenet', data));
  socket.on('handpose', data => socket.broadcast.emit('handpose', data));
  socket.on('facemesh', data => socket.broadcast.emit('facemesh', data));
});
