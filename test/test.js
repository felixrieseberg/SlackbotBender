var assert = require("assert"),
yell = require('../integrations/yell');

describe('Yell', function(){
  describe('#getResponse()', function(){
    it('should return some text when called with a string', function(done){
    	yell.getResponse('yell hello world!', function(data) 
    		{ 
    			console.log(data);
    			assert(data.length > 0); 
    			done();
    		});
    })
  })
})
