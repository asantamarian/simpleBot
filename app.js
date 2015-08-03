// initialize everything, web server, socket.io, filesystem, johnny-five
var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs')
    , five = require("johnny-five"),
    board,led;

board = new five.Board();

// on board ready
board.on("ready", function() {

    // init a led on pin 13, strobe every 1000ms
    led = new five.Led(13).strobe(1000);


});

// make web server listen on port 80
app.listen(3000);


// handle web server
function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}


// on a socket connection
io.sockets.on('connection', function (socket) {

    socket.on('led', function (data) {
        console.log(data);
        if(board.isReady){
            led.strobe(data.delay);
        }
    });
    socket.on('ledOff', function () {

        if(board.isReady){
            led.stop();
            led.off();
            console.log('ledOff');
        }
    });

});