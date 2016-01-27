var Route = function(){
   this.stations = {};
   this.buses = {};
};

Route.prototype = {
   addBus : function(busNo){
      this.buses[busNo] = this.buses[busNo] || [];
   },
   addStation : function(station){
      this.stations[station] = this.stations[station] || [];
   },
   addBusToStation : function(busNo ,station){
      this.stations[station] = this.stations[station] && this.stations[station].push(busNo) || [busNo];
      this.buses[busNo] = this.buses[busNo] && this.buses[busNo].concat(station) || [station]
   },
}

module.exports = Route;
