var twilio = require('twilio'),
    redis = require("redis"),
    util = require('util'),
    _ = require('underscore'),
    _s = require('underscore.string'),

    phrases = require('../bot/phrases'),
    config = require('../config'),
    storage = require('node-persist'),
    twilioclient = new twilio.RestClient(config.twilioAccount, config.twilioToken),
    phonetext;

    storage.initSync();

phonetext = {

    sendText: function(text, number, callback) {
        if (!config.twilioNumber || !config.twilioAccount || !config.twilioToken) {
            return callback('Hey, I\'ll need some Twilio config vars over here. This doesn\'t work without \'em.');
        }

        twilioclient.sendMessage({
            to: number,
            from: config.twilioNumber,
            body: text
        }, callback);
    },

    getNumber: function (name) {
        savedNumbers = storage.getItem('phonenumbers') || {};
        console.log(savedNumbers);
        return savedNumbers[name];
    },

    setNumber: function (query, callback) {
        var user, number, savedNumbers;

        if (_s.include(query, 'save phone number')) {
            query = _s.strRight(query, 'save phone number ');
            number = _s.strLeft(query, ' for');
            user = _s.strRight(query, 'for ');
        } else if (_s.include(query, '!savenumber')) {
            query = _s.strRight(query, '!savenumber ').split(' ');
            user = query[1];
            number = query[0];
        }

        console.log('Saving phone number ' + number + ' for ' + user);
        if (number && user) {
            savedNumbers = storage.getItem('phonenumbers') || {};
            savedNumbers[user] = number;

            storage.setItem('phonenumbers', savedNumbers);
            callback('Hey, I saved ' + number + ' for ' + user + '. We can now send that sucker texts and stuff.');
        }
        
    },

    ping: function (query, callback) {

    },

    text: function (query, callback) {
        var text, number, self;

        text = query.match(/"(.+)"/)[1];
        query = _s.strRight(query, 'text ');
        number = _s.strLeft(query, ' "');

        if (/^[a-zA-Z]+$/.test(number)) {
            // Our number is in fact a name
            number = this.getNumber(number);
            if (!number) {
                return callback('Hey! I don\'t have a number for that guy! How do you want me to text him?');
            }
        }

        this.sendText(text, number, function (error, result) {
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