const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions = {
  origin: 'http://localhost:4567',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const server = require('http').createServer(app);
const signalR = require('./signalr')(server);
const port = 3003;

const chat = signalR.mapHub('/chatHub');
const clock = signalR.mapHub('/clock');

setInterval(() => {
  clock.clients.all.send('tick', Date.now());
}, 1000);

chat.on('connect', id => {
  console.log(`${id} connected`);
});

chat.on('disconnect', id => {
  console.log(`${id} disconnected`);
});

chat.on('SendMessage', (user, message) => {
  console.log(user, message);
  chat.clients.all.send('ReceiveMessage', user, message);
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
