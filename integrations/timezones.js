var wolframalpha = require('./wolframalpha'),
    _ = require('underscore'),
    util = require('util'),

    phrases = require('../bot/phrases');

var timezones = {

    getTime: function(input, callback) {
        wolframalpha.executeQuery(input, function(result) {
            
            result = _.where(result, {title: 'Result'});

            if (result && result.length > 0) {
                var timeDate = result[0].subpods[0].value,
                    image = result[0].subpods[0].image;

                if (!timeDate) {
                    return callback(phrases.say('error'));
                }

                console.log(util.inspect(result[0].subpods));

                return callback('The time over there is ' + timeDate);
            }
        });
    }

};

module.exports = timezones;
