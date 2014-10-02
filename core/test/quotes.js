/*jshint -W030 */
/* This is needed for jshint to be okay with `should.be.ok` */

var should      = require('should'),
    quotes      = require('../bot/integrations/quotes');

describe('Quotes', function () {
    describe('#bender()', function () {
        it('should get a response', function (done) {
            quotes.bender(null, function (data) {
                should.exist(data);
                done();
            });
        });
    });
});
