var phrases = require('../bot/phrases');

var quotes = {

    bender: function () {
        var quote = phrases.quotes[Math.floor(Math.random() * phrases.quotes.length)];
        return quote;
    }

};

module.exports = quotes;