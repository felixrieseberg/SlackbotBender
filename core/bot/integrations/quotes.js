var phrases = require('../phrases');

var quotes = {

    bender: function (reqText, callback) {
        return callback(phrases.quotes[Math.floor(Math.random() * phrases.quotes.length)]);
    }

};

module.exports = quotes;