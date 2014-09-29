var should      = require('should'),
    development = require('../integrations/development');

describe('Development', function () {
    describe('#getResponse()', function () {
        it('should get a response', function (done) {
            development.getResponse(null, function (data) {
                should.exist(data);
                done();
            });
        });

        it('should have an attachment field', function (done) {
            development.getResponse(null, function (data, attachments) {
                should.exist(attachments);
                done();
            });
        });

        it('should have an attachment', function (done) {
            development.getResponse(null, function (data, attachments) {
                should.exist(attachments[0]);
                done();
            });
        });

        it('should have information fields', function (done) {
            development.getResponse(null, function (data, attachments) {
                attachments[0].should.have.property('fields');
                attachments[0].should.have.property('fields').with.lengthOf(6);
                done();
            });
        });

        it('should return node version', function (done) {
            development.getResponse(null, function (data, attachments) {
                attachments[0].fields[1].should.have.property('value');
                attachments[0].fields[1]['value'].should.not.be.empty;
                done();
            });
        });

        it('should return memory usage', function (done) {
            development.getResponse(null, function (data, attachments) {
                attachments[0].fields[4].should.have.property('value');
                attachments[0].fields[4]['value'].should.not.be.empty;
                done();
            });
        });

        it('should return uptime', function (done) {
            development.getResponse(null, function (data, attachments) {
                attachments[0].fields[5].should.have.property('value');
                attachments[0].fields[5]['value'].should.endWith('seconds');
                done();
            });
        });

    });
});
