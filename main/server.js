const express = require("express");
const app = express();
const http = require('http').Server(app);
const engine = require('ejs-locals');
const io = require('socket.io')(http);
const path = require('path');

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.set('views', path.join(__dirname, './client'));

// setup express router
app.get('/', function (req, res) {
    res.render('main');
}); 


io.on('connection', function (socket) {
    console.log('a user connected, user id: ');
});


// setup socket.io
var userId = 0;
io.on('connection', function (socket) {
    socket.userId = userId++;
    console.log('a user connected, user id: ' + socket.userId);

    socket.on('chat', function (msg) {
        console.log('message from user#' + socket.userId + ": " + msg);
    });
});


let PORT = 80;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));