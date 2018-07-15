var express = require('express');
var app = express();
var morgan = require('morgan');
//var bodyParser = require('body-parser')
//var cookieParser = require('cookie-parser')

var http = require('http').Server(app);

var io = require('socket.io')(http);


//var date = new Date().format('m-d-Y h:i:s');

var usersNames = require('./server/usersNames.js');
//var socket = require('./server/routes.js');
function checkMes(msg) {
    if (typeof msg.text === "undefined") {
        return false;
    }

    //const maxUserLength = 20;
    //const maxMesLength = 500;
    var conf = require("./variables.js");
    //if (msg.name.length > conf.maxUserLength) {
    //    msg.name = msg.name.substring(0, conf.maxUserLength);
    //}
    if (msg.text.length > conf.maxMesLength) {
        msg.text = msg.text.substring(0, conf.maxMesLength) + " ...(MAX " + conf.maxMesLength + "sym)";
    }
    msg.dat = new Date().getTime()
    return msg;
}
//function sendUsersList(socket,users){

//usersNames.getNames()
//}
io.on('connection', function (socket) {
    const id = socket.id;
    //var socket;
    socket.on('send:message', function (msg) {
        msg = checkMes(msg);
        if (msg) {
            user = usersNames.getUserById(id);
            if (user) {
                msg.name = user.name;
                msg.color = user.color;
                io.emit('send:message', msg);
            } else {
                msg = {"error": "not_user"}
                io.to(id).emit('send:message', msg);
            }
            // console.log(msg);

        } else {
            console.log("ERR msg");
        }
    });
    socket.on('user:claim', function (name) {
        //msg=checkMes(msg);
        if (usersNames.claim(name, id)) {
            var users = usersNames.getUsersName()
            data = {"login": name,
                "users": users}
            //sendUsersList(socket,users);
            socket.broadcast.emit('user:list', users);
        } else {
            data = {"error": "login_exists"}
        }
        //console.log(data);
        io.to(id).emit('user:claim', data);

        //console.log();



    });
    socket.on('user:logout', function () {
        usersNames.free(id);
        //console.log(usersNames.getUsersName());
        io.to(id).emit('user:logout');
        socket.broadcast.emit('user:list', usersNames.getUsersName());
        //sendUsersList(socket,usersNames.getUsersName());

    });
    socket.on('disconnect', function (data) {
        //socket.broadcast.emit('user:left', {
        //    name: name
        //});
        usersNames.free(id);
        socket.broadcast.emit('user:list', usersNames.getUsersName());
        ///console.log(id + " " + data);

    });
    //socket.on('change:name', function (data) {
    //    console.log(data);
    //    io.emit('change:name', data);
    //});
});


//io.on('connection', function (socket) {
//    console.log('a user connected');
//});

//app.get('/*', function (req, res) {
//  console.log("HOST:"+req.host);  
//res.send('Admin Homepage');
//});





app.use(morgan('combined'));
app.use(express.static('public'));
http.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});