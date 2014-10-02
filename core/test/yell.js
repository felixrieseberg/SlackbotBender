/*jshint -W030 */
/* This is needed for jshint to be okay with `should.be.ok` */

var should  = require('should'),
    yell    = require('../bot/integrations/yell');

describe('Yell', function(){
    describe('#getResponse()', function(){
        it('should get a response', function (done){
            yell.getResponse('yell hello world!', function (data) { 
                should.exist(data);
                done();
            });
        });
    });
});
