 var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var Transport = require('./busRoutes.js');
var app = express();

var bangloreData = fs.readFileSync('./data/busData.txt','UTF-8');

var t = new Transport();
t.initializeTransport(bangloreData);


var getAllStations = function(req, res) {
	res.send(t.getAllStations());
};
var getDirectBuses = function(req ,res){
	res.send(t.allDirectBusesBetween(req.query.from ,req.query.to));
}
var getAlternateBuses = function(req ,res){
	res.send(t.getAlternateBusesBetween(req.query.from ,req.query.to));
}

app.use(bodyParser.urlencoded({ extended: true	 }));
app.use(express.static('./public'));

app.get('/alternateBuses',getAlternateBuses);
app.get('/directbuses',getDirectBuses);
app.get('/allStations', getAllStations)

module.exports = app;