'use-strict';

var express = require('express');
var app = express();
var path = require('path');
var socketEvents = require('./socketEvents');

const staticFiles = express.static(path.join(__dirname, '../../client/build'));

app.use(staticFiles);



app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
})

const server= app.listen(process.env.PORT || 3000, () => {
	console.log('Static files served on port 3000');
});

// set up socket.io
const io = require('socket.io').listen(server);

socketEvents(io);