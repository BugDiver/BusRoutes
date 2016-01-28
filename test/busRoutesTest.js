var expect = require('chai').expect;
var Transport = require('../lib/busRoutes');

var cityData = '1:A,B,C,D,E,F,G\r\n' +
    '2:A,B,C1,D1,E1,F1\r\n' +
    '3:C,D1,D2,F1,H\r\n' +
    '4:B,D,E2,F2,G1,H1\r\n' +
    '5:C,R,S,T,K,L,M\r\n' +
    '6:C,R,S,T,U,V,W\r\n' +
    '7:D,E,F1,G1,H1,I,J\r\n' +
    '8:B,C2,D2,E2,F2,G2';

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

    describe('getAlternateBuses', function() {
        it('should give a alternate bus between to location', function() {
            r.initializeTransport(cityData);
            var allAlternatePaths = [ { "A_to_B":["1","2"], "B_to_G1":["4"] },
            						  { "A_to_D":["1"], "D_to_G1":["4","7"] },
            						  { "A_to_F1":["2"], "F1_to_G1":["7"] },
            						  { "A_to_E":["1"], "E_to_G1":["7"] }
            						];

            expect(r.getAlternateBuses('A', 'G1')).to.be.eql(allAlternatePaths);

        });
    });

});
