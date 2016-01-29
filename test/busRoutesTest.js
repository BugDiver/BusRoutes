var expect = require('chai').expect;
var Transport = require('../lib/busRoutes');

var cityData = [  { busNo: '1', stations: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ] },
                  { busNo: '2', stations: [ 'A', 'B', 'C1', 'D1', 'E1', 'F1' ] },
                  { busNo: '3', stations: [ 'C', 'D1', 'D2', 'F1', 'H' ] },
                  { busNo: '4', stations: [ 'B', 'D', 'E2', 'F2', 'G1', 'H1' ] },
                  { busNo: '5', stations: [ 'C', 'R', 'S', 'T', 'K', 'L', 'M' ] },
                  { busNo: '6', stations: [ 'C', 'R', 'S', 'T', 'U', 'V', 'W' ] },
                  { busNo: '7', stations: [ 'D', 'E', 'F1', 'G1', 'H1', 'I', 'J' ] },
                  { busNo: '8', stations: [ 'B', 'C2', 'D2', 'E2', 'F2', 'G2' ] } ]

var r;
beforeEach(function() {
    r = new Transport();
})

describe('Transport', function() {
    describe('addBusToStation', function() {
        it('should add bus to given station', function() {
            r.addBusToStation('111', 'majestic');
            expect(r.stations).to.have.property('majestic').to.be.eql(['111']);
        });
        it('should also add the station to relative bus', function() {
            r.addBusToStation('111', 'majestic');
            expect(r.buses).to.have.property('111').to.be.eql(['majestic']);

        });
    });

    describe('initializeTransport', function() {
        it('should initialize the transport according to given city data', function() {
            r.initializeTransport(cityData);
            expect(Object.keys(r.buses).length).to.be.equal(8);
            expect(Object.keys(r.stations).length).to.be.equal(30);
        });
    });

    describe('allBusesPassingFrom', function() {
        it('should give list of all buses passing through the given station', function() {
            r.initializeTransport(cityData);
            var buses = r.allBusesPassingFrom('C');
            expect(buses.length).to.be.eql(4);
        });
    });

    describe('allDirectBusesBetween', function() {
        it('should give list all buses between given two locations', function() {
            r.initializeTransport(cityData);
            expect(r.allDirectBusesBetween('A', 'B')).to.be.eql(['1', '2']);
            expect(r.allDirectBusesBetween('C', 'E')).to.be.eql(['1']);
            expect(r.allDirectBusesBetween('D1', 'F1')).to.be.eql(['2', '3']);
            expect(r.allDirectBusesBetween('C', 'T')).to.be.eql(['5', '6']);
            expect(r.allDirectBusesBetween('A', 'R')).to.be.eql([]);
        });
    });

    describe('getHubs', function() {
        it('should give list of hubs where most buses going through', function() {
            r.initializeTransport(cityData);
            expect(r.getHubs(1)).to.be.eql(['C']);
            expect(r.getHubs(2)).to.be.eql(['C', 'B']);
            expect(r.getHubs(3)).to.be.eql(['C', 'B', 'D']);
            expect(r.getHubs(4)).to.be.eql(['C', 'B', 'D', 'F1']);

        });
    });

    describe('getAllStations',function(){
    	it('should give list of all sations',function(){
    		r.initializeTransport(cityData);
    		var stations =["A","B","C","D","E","F","G","C1","D1","E1","F1","D2","H","E2",
		    				"F2","G1","H1","R","S","T","K","L","M","U","V","W","I","J","C2","G2"];
    		expect(r.getAllStations()).to .be.eql(stations)
    	});
    });
    describe('getAlternateBusesBetween', function() {
        it('should give a alternate bus between to location', function() {
            r.initializeTransport(cityData);
            var allAlternatePaths = [ { "A":["1","2"], "B":["4"] },
            						  { "A":["1"], "D":["4","7"] },
            						  { "A":["2"], "F1":["7"] },
            						  { "A":["1"], "E":["7"] }
            						];

            expect(r.getAlternateBusesBetween('A', 'G1')).to.be.eql(allAlternatePaths);

        });
    });

});
