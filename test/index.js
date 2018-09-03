'use strict';

var log = require('debug')('node-nominatim2'),
    util = require('util');

require('should');

var Nominatim = require('../index');

var options = {
    useragent: "MyApp",
    referer: "https://github.com/xbgmsharp/node-nominatim2"
},
    nominatim = new Nominatim(options);

describe('Nominatim', function () {
  describe('#search', function () {
    it('should return data for an address details and latitude and longitude', function (done) {
      nominatim.search({ q: 'Lille'}, function (err, res, data) {
        if (err) throw err;
        log('data: ' + util.inspect(data));
        data.should.not.equal.null;
        data[0].should.have.property('lon');
        data[0].should.have.property('lat');
        data[0].should.have.property('address');
        data[0].address.should.have.property('country');
        done();
      });
    });
  });
  describe('#reverse', function () {
    it('should return data for an address from latitude and longitude', function (done) {
      var options = {
        'lat': 35.6916666,
        'lon': 139.7746613
      };
      nominatim.reverse(options, function (err, res, data) {
        if (err) throw err;
        log('data: ' + util.inspect(data));
        res.should.not.equal.null;
        data.should.not.equal.null;
        data.should.have.property('lon');
        data.should.have.property('lat');
        data.should.have.property('address');
        data.address.should.have.property('country');
        done();
      });
    });
  });
  describe('#lookup', function () {
    it('should return the address from one or multiple OSM objects like node, way or relation.', function (done) {
      var options = {
        'osm_ids': 'R146656,W104393803,N240109189'
      };
      nominatim.lookup(options, function (err, res, data) {
        if (err) throw err;
        log('data: ' + util.inspect(data));
        res.should.not.equal.null;
        data.should.not.equal.null;
        data[0].should.have.property('lon');
        data[0].should.have.property('lat');
        data[0].should.have.property('address');
        data[0].address.should.have.property('country');
        done();
      });
    });
  });
});
