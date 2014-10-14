var _       = require('underscore'),
    _s      = require('underscore.string'),
    util    = require('util'),
    request = require('request'),
    debug   = require('debug')('Bender-Fortune'),
    phrases = require('../phrases');


var fortune = {
    getResponse: function (query, callback) {
        var url = 'http://anduin.eldar.org/cgi-bin/fortune.pl';
        request.get(url, function (err, res, body) {
            if (err || res.statusCode !== 200) {
                debug('Fortune error fetching ' + url + ': ' + err + ', ' + res.statusCode);
                return callback(phrases.say('errors'));
            }
            debug('Responded: ' + body);
            return callback(body);
        });
    }

};

module.exports = fortune;