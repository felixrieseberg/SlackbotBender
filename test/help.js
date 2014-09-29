var should      = require('should'),
    help        = require('../integrations/help');

describe('Help', function () {
    describe('#sendHelp()', function () {
        it('should get a response', function (done) {
            help.sendHelp(null, function (data) {
                should.exist(data);
                done();
            });
        });

        it('should have an attachment field', function (done) {
            help.sendHelp(null, function (data, attachments) {
                should.exist(attachments);
                done();
            });
        });

        it('should have an attachment', function (done) {
            help.sendHelp(null, function (data, attachments) {
                should.exist(attachments[0]);
                done();
            });
        });
    });
});
