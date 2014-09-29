var should      = require('should'),
    quotes      = require('../integrations/quotes');

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
