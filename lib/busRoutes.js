var _ = require('lodash');  

var Transport = function() {
    this.stations = {};
    this.buses = {};
};

Transport.prototype = {
   addBusToStation: function(busNo, station) {
     this.buses[busNo] = this.buses[busNo] && this.buses[busNo].concat(station) || [station];
     this.stations[station] = this.stations[station] && this.stations[station].concat(busNo) || [busNo];
   },
   initializeTransport: function(cityData) {
     var self = this;
     cityData.forEach(function(busInfo) {
         busInfo.stations.forEach(function(station) {
             self.addBusToStation(busInfo.busNo, station);
         });
     });
   },
   allBusesPassingFrom: function(station) {
     return this.stations[station];
   },
   allDirectBusesBetween: function(from, to) {
     var goingFrom = this.allBusesPassingFrom(from);
     var goingTo = this.allBusesPassingFrom(to);
     return _.intersectionWith(goingFrom, goingTo, _.isEqual);
   },
   getHubs: function(count) {
     var self = this;
     var hubs = Object.keys(self.stations).sort(function(s1name, s2name) {
         return self.stations[s2name].length - self.stations[s1name].length;
     });
     return hubs.slice(0, count);
   },
   getAlternateBusesBetween: function(from, to) {
     var routes = []
     var hubs = this.getHubs(30);
     var self = this;
     hubs.forEach(function(hub) {
         var sourceToHub = self.allDirectBusesBetween(from, hub);
         var hubToDest = self.allDirectBusesBetween(hub, to);
         if (sourceToHub.length && hubToDest.length) {
             var route = {}
             route[from] = sourceToHub;
             route[hub] = hubToDest;
             routes.push(route);
         }
     })
     return routes;
   },
   getAllStations : function(){
      return Object.keys(this.stations);
   }

}

module.exports = Transport;
