/*jshint -W030 */
/* This is needed for jshint to be okay with `should.be.ok` */

var debug   = require('debug')('Bender-Fortune'),
    should  = require('should'),
    finance = require('../bot/integrations/fortune');

describe('Fortune', function(){
    describe('#getResponse()', function(){
        it('should get a response', function (done) {
            finance.getResponse(null, function (data) {
                should.exist(data);
                done();
            });
        });
    });
});
