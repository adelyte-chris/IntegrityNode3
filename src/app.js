var debug = require('debug')('IntegrityNode3');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'));
console.log('Express server listening on port ' + server.address().port);


app.use(express.static(__dirname + '/../public'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    var socketTraffic = new (require('./commonModule/socketTraffic')).Init(socket);
    var workspace = require('./businessLogicModule/workspace');
    workspace.init(socketTraffic);
    var workitem = require('./businessLogicModule/workitem');
    workitem.init(socketTraffic);
});
io.sockets.on("connection", function(socket){
    console.log("socket was connected to address: " + socket.client.conn.remoteAddress);
});

//var express = require('express');
//var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
//
//var routes = require('./uiModule/routes/index');
//var users = require('./uiModule/routes/users');
//
//var app = express();
//
//// REST CONTROLLERS
//var controllers = require('./itcApiModule/controllers/index');
//
//// SOCKET CONTROLLERS
//var http = require('http').Server(app);
////var io = require('socket.io')(http);
////http.listen(59682, function(){
////    console.log('socket.io listening on *:59682');
////});
//var socketio = require('socket.io');
//var io = socketio.listen(http);
//io.sockets.on("connection", function(socket){
//    console.log("socket was connected to port " + socket.port);
//});
//var workspace = require('./businessLogicModule/workspace');
//workspace.init(io);
//
//
//
//// uncomment after placing your favicon in /public
////app.use(favicon(__dirname + '/public/favicon.ico'));
////app.use(logger('dev'));
////app.use(bodyParser.json());
////app.use(bodyParser.urlencoded({ extended: false }));
////app.use(cookieParser());
////
/////**
//// * CORS support.
//// */
////
////app.all('*', function(req, res, next){
////    if (!req.get('Origin')) return next();
////    // use "*" here to accept any origin
////    res.set('Access-Control-Allow-Origin', '*');
////    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
////    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
////    // res.set('Access-Control-Allow-Max-Age', 3600);
////    if ('OPTIONS' == req.method) return res.send(200);
////    next();
////});
//
//
////app.use(express.methodOverride());
////app.use(allowCrossDomain);
////app.use(require('less-middleware')(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/../public'));
//
//// Map the routes
////controllers.init(app);
//
//// view engine setup
//app.set('views', path.join(__dirname, 'uiModule/views'));
//app.set('view engine', 'hjs');
//
//
//
//app.use('/', routes);
////app.use('/users', users);
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function(err, req, res) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});
//
//
//module.exports = app;
