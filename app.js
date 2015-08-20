var five = require("johnny-five"),
    board,led;
 
board = new five.Board();

// on board ready
board.on("ready", function() {

    // init a led on pin 13, strobe every 1000ms
    led = new five.Led(13).strobe(1000);


});

// make web server listen on port 80
var express = require('express');
var app = express();

app.get('/', function(req , res){
    res.send('public');
});

app.use('/public',express.static('public'));
app.get('/ledDelay', function(req, res){
     var delay = req.query.delay;
     if(board.isReady){
            led.strobe(delay);
        }
     res.send('led delay set to ' + req.query.delay);

});

app.get('/ledOff', function(req, res){
     if(board.isReady){
            led.stop();
            led.off();
            console.log('ledOff');
        }
     res.send("led Off");

});
var port = Number(process.env.PORT || 3000);
app.listen(port);
/*

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

});*/