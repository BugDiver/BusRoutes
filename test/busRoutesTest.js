var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var Transport = require('../lib/busRoutes');

var fileName = path.join(__dirname,'../data/busData.txt')
var bangloreData = fs.readFileSync(fileName,'UTF-8');

var r;

beforeEach(function(){
	r = new Transport();
})

describe('Transport',function(){
	describe('addBusToStation',function(){
		it('should add bus to given station',function(){
			r.addBusToStation('111','majestic');
			expect(r.stations).to.have.property('majestic').to.be.eql(['111']);
		});
		it('should also add the station to relative bus',function(){
			r.addBusToStation('111','majestic');
			expect(r.buses).to.have.property('111').to.be.eql(['majestic']);
			
		});
	});

	describe('initializeTransport',function(){
		it('should initialize the transport according to given city data',function(){
			r.initializeTransport(bangloreData);
			expect(Object.keys(r.buses).length).to.be.equal(1462);
			expect(Object.keys(r.stations).length).to.be.equal(988);
		});
	});

	describe('allBusesPassingFrom',function(){
		it('should give list of all buses passing through the given station',function(){
			r.initializeTransport(bangloreData);
			var buses = r.allBusesPassingFrom('UTTARAHALLI');
			expect(buses.length).to.be.eql(17);
		});
	});

	describe('allDirectBusesBetween',function(){
		it('should give list all buses between given two locations',function(){
			r.initializeTransport(bangloreData);
			var buses = r.allDirectBusesBetween('MANIPAL HOSPITAL','CARMEL CONVENT SCHOOL')
			expect(buses).to.be.eql(['411A']);
		});
	});
})
