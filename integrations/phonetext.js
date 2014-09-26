var twilio = require('twilio'),
    util = require('util'),
    phrases = require('../bot/phrases'),
    client = new twilio.RestClient(process.env.twilioAccount, !process.env.twilioToken),
    phonetext;

phonetext = {

    sendText: function(text, number, callback) {
        if (!process.env.twilioNumber || !process.env.twilioAccount || !process.env.twilioToken) {
            return callback('Hey, I\'ll need some Twilio config vars over here. This doesn\'t work without \'em.');
        }

        client.sendMessage({
            to: number,
            from: process.env.twilioNumber,
            body: text

        }, callback);
    },

    text: function (query, callback) {
        var text, number;

        text = query.match(/"(.+)"/)[1];
        query = _s.strRight(query, 'text ');
        number = _s.strLeft(query, ' "');

        this.sendText(text, number, function(error, result) {
            var errorText;

            if (error) {
                console.warn('Twilio Error', util.inspect(error));
                return callback(error);
            }

            console.log('Twilio Result', util.inspect(result));
            return callback(phrases.say('textsuccess'));
        });
    }

};

module.exports = phonetext;