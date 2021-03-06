/*jshint -W030 */
/* This is needed for jshint to be okay with `should.be.ok` */

var should      = require('should'),
    _s          = require('underscore.string'),
    helpers     = require('../bot/helpers');

describe('Helpers', function () {
    describe('#containsAny()', function () {
        it('should find matches', function (done) {
            var result = helpers.containsAny('string with a match', [ 'not here', 'nor here', 'with']);
            result.should.be.true;
            done();
        });

        it('should fail on no match', function (done) {
            var result = helpers.containsAny('string with a match', [ 'not here', 'nor here']);
            result.should.not.be.true;
            done();
        });
    });

    describe('#startsWithAny()', function () {
        it('should find matches', function (done) {
            var result = helpers.startsWithAny('string with a match', [ 'not here', 'nor here', 'string with']);
            result.should.be.true;
            done();
        });

        it('should fail on non-starting', function (done) {
            var result = helpers.startsWithAny('string with a match', [ 'not here', 'nor here', 'with']);
            result.should.not.be.true;
            done();
        });

        it('should return match when asked', function (done) {
            var result = helpers.startsWithAny('string with a match', [ 'not here', 'nor here', 'string with'], true);
            result.should.eql('string with');
            done();
        });
    });

    describe('#randElt()', function () {
       it('should generate all elements', function(done) {
          var arr = [0, 1, 2, 3];
          var seen = [false, false, false, false];
          for (var idx=0; idx < 1000; ++idx) {
              seen[helpers.randElt(arr)] = true;
          }
          console.log(JSON.stringify(seen));
          seen.forEach(function (v) {v.should.be.true;});
          done();
       });
    });
});
