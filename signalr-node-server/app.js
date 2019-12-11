const express = require('express');
const cors = require('cors');
const app = express();
const settings = require('./settings.json');
const corsOptions = {
    origin: settings.origin,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
};

// Tell the app to use CORS with configured options
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const http = require('http').createServer(app);
const signalR = require('./signalr')(http);
const port = settings.port;

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

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});
