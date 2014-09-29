/*jshint -W030 */
/* This is needed for jshint to be okay with `should.be.ok` */

var should      = require('should'),
    _s          = require('underscore.string'),
    helpers     = require('../bot/helpers');

describe('Helpers', function () {
    describe('#containsAny()', function () {
        it('should find matches', function (done) {
            var result = helpers.containsAny('string with a match', [ 'not here', 'nor here', 'with']);
            result.should.be.ok;
            done();
        });

        it('should fail on no match', function (done) {
            var result = helpers.containsAny('string with a match', [ 'not here', 'nor here']);
            result.should.not.be.ok;
            done();
        });
    });

    describe('#startsWithAny()', function () {
        it('should find matches', function (done) {
            var result = helpers.startsWithAny('string with a match', [ 'not here', 'nor here', 'string with']);
            result.should.be.ok;
            done();
        });

        it('should fail on non-starting', function (done) {
            var result = helpers.startsWithAny('string with a match', [ 'not here', 'nor here', 'with']);
            result.should.not.be.ok;
            done();
        });

    });
});
