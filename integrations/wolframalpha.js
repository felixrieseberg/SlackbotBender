var wolfram = require('wolfram').createClient(process.env.wolframappid),
    _ = require('underscore'),
    _s = require('underscore.string'),
    util = require('util'),

    phrases = require('../bot/phrases'),
    wolframalpha;

wolframalpha = {

    executeQuery: function (query, callback) {
        wolfram.query(query, function(error, result) {  
            if (error) {
                console.warn(util.inspect(error));
            }
            callback(result);
        })
    },

    getResponse: function (query, callback) {

        query = _s.strRight(query, 'wolfram');

        wolfram.query(query, function(error, result) {  
            var errorText;

            if (error) {
                console.warn('Wolfram Error', util.inspect(error));
                errorText = phrases.say('error');
                errorText += 'All I got was: ' + error;
                return callback(errorText);
            }
            
            console.log('Wolfram Result \n', util.inspect(result));           
            
            result = _.where(result, {title: 'Result'});

            if (result && result.length > 0 && result[0].subpods[0].value) {
                return callback(phrases.say('wolfram') + result[0].subpods[0].value);
            } else {
                return callback('I asked Wolfram, but didn\'t really understand the response.')
            }
        })
    }

}

module.exports = wolframalpha;