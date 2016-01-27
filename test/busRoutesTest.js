var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var Route = require('../lib/busRoutes');

var fileName = path.join(__dirname,'../data/busData.txt')
var bangloreData = fs.readFileSync(fileName,'UTF-8');

var r;

beforeEach(function(){
	r = new Route();
})

describe('Transport',function(){
	describe('addStation',function(){
		it('should a station add a new station in city transport',function(){
			r.addStation('majestic');
			expect(r.stations).to.have.property('majestic');
		});
	});
	describe('addBus',function(){
		it('should add a bus to city transport',function(){
			r.addBus('111');
			expect(r.buses).to.have.property('111');

		});
	});
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
})
