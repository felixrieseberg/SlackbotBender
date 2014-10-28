/*jshint -W030 */
/* This is needed for jshint to be okay with `should.be.ok` */

var debug   = require('debug')('Bender-Finance'),
    should  = require('should'),
    finance = require('../bot/integrations/finance');

describe('Finance', function(){
    describe('#getResponse()', function(){
        this.timeout(5000);

        it('should never show NaN', function(done){
            finance.getResponse('ticker rsh', function(data)
            {
                data.should.not.match(/NaN/);
                done();
            });
        });

        it('should tolerate bad input', function(done){
            finance.getResponse('ticker no symbol here', function(data)
            {
                data.should.match(/not a symbol/);
                done();
            });
        });

        it('should tolerate non-existent symbols', function(done){
            finance.getResponse('ticker nostock', function(data)
            {
                data.should.match(/not a symbol/);
                done();
            });
        });
    });
});
