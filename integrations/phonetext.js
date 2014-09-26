var twilio = require('twilio'),
    util = require('util'),
    _s = require('underscore.string'),

    phrases = require('../bot/phrases'),
    config = require('../config'),
    client = new twilio.RestClient(config.twilioAccount, config.twilioToken),
    phonetext;

phonetext = {

    sendText: function(text, number, callback) {
        if (!config.twilioNumber || !config.twilioAccount || !config.twilioToken) {
            return callback('Hey, I\'ll need some Twilio config vars over here. This doesn\'t work without \'em.');
        }

        client.sendMessage({
            to: number,
            from: config.twilioNumber,
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
                return callback(error.message);
            }

            console.log('Twilio Result', util.inspect(result));
            return callback(phrases.say('textsuccess'));
        });
    }

};

module.exports = phonetext;