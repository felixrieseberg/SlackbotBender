var phrases = require('../phrases'),
    helpers = require('../helpers');

var quotes = {

    bender: function (reqText, callback) {
        return callback(helpers.randElt(phrases.quotes));
    }

};

module.exports = quotes;