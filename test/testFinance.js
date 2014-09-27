var should = require('should'),
    finance = require('../integrations/finance');

describe('Finance', function(){
    describe('#getResponse()', function(){
        it('should never show NaN', function(done){
            finance.getResponse('ticker rsh', function(data)
            {
                console.log(data);
                data.should.not.match(/NaN/);
                done();
            });
        });

        it('should tolerate bad input', function(done){
            finance.getResponse('ticker no symbol here', function(data)
            {
                console.log(data);
                data.should.match(/not a symbol/);
                done();
            });
        });

        it('should tolerate non-existent symbols', function(done){
            finance.getResponse('ticker nostock', function(data)
            {
                console.log(data);
                data.should.match(/not a symbol/);
                done();
            });
        });
    });
});
