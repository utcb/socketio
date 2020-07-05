// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));  
app.get('/test.html', function(req, res,next) {  
    res.sendFile(__dirname + '/test.html');
});

io.of('/gomoku/chat').on('connection', function(client) {
    console.log('Client connected...');
    client.on('join', function(data) {
       console.log(data);
       client.emit('broad_message', client.id + ": " + data);
       client.broadcast.emit('broad_message', client.id + ": " + data);
       client.on('chat_message', function(data) {
           console.log('chat_message: ' + data);
            client.emit('broad_message', client.id + ": " + data);
            client.broadcast.emit('broad_message', client.id + ": " + data);
       })
    });
});

server.listen(3479);
