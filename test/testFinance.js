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
    });
});
