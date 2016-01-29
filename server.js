var http  =require('http');
var router = require('./lib/routes.js');
var server = http.createServer(router).listen(8080);