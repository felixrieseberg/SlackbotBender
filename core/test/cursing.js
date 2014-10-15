/*jshint -W030 */
/* This is needed for jshint to be okay with `should.be.ok` */

var debug   = require('debug')('Bender-Cursing'),
    should  = require('should'),
    cursing = require('../bot/integrations/cursing');

describe('Cursing', function() {
    describe('#bender()', function () {
        it('should cope with @name', function (done) {
            cursing.bender('curse @milanz', function (data) {
                data.should.not.match(/@@milanz/);
                done();
            });
        });

        it('should curse "someone"', function(done) {
            cursing.bender('curse someone', function (data) {
                data.should.match(/@slackbot/);
                done();
            });
        });

        it('should curse "someone" from env list', function(done) {
            process.env.userList = 'cartman,marklar';
            cursing.bender('curse someone', function (data) {
                data.should.match(/(cartman|marklar)/);
                done();
            });
        });
    });
});