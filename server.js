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
app.use('/posenet', express.static('posenet-neural-network-classification'));
app.use('/handpose', express.static('handpose-neural-network-classification'));
app.use('/facemesh', express.static('facemesh-neural-network-classification'));

const io = require('socket.io')(http, options);
io.on('connection', socket => {
  console.log(socket.id);
  socket.on('disconnect', () => console.log(`${socket} disconnected`));
  socket.on('posenet', data => console.log(data));
  socket.on('handpose', data => console.log(data));
  socket.on('facemesh', data => console.log(data));
});
