//Settings
var config      = require("./config");
var mongo       = require("./mongo");
//var secrets     = require("./secrets");

//Modules
var http        = require('http');
var express     = require("express");
var socketio    = require('socket.io');



//express app
var app         = express();

module.exports = function(){
    //Socket.io
    var server  = http.createServer(app);
    var io      = socketio.listen(server);

    //Connection Event
    io.on('connection', function (socket) {        
        //console.log('server - connection event');

        //On New State - broadcast to all (including the sender)
        socket.on('new state', function (data) {
            io.sockets.emit("new state", data);
        });
        //Disconnect
        socket.on('disconnect', function(){
            //console.log('user disconnected');
        });
    });


    var bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    //Views
    app.set("views", "./app/views");
    app.set("view engine", "ejs");

    //Routes
    var api = require("./../app/routes/api.route.server");
    app.use("/api", api);

    var index = require("./../app/routes/index.route.server");
    app.use("/", index);

    //static files
    app.use(express.static('./public'));

    return server;
}