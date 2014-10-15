var _       = require('underscore'),
    _s      = require('underscore.string'),
    util    = require('util'),
    request = require('request'),
    debug   = require('debug')('Bender-Fortune'),
    phrases = require('../phrases');


var fortune = {
    getResponse: function (query, callback) {
        // There are a number of arguments which might prove to be useful:

        // fortune_db=[fortunes,fortunes2,limerick,pratchett,startrek,unamerican,zippy,bofh-excuses,futurama,farber,netbsd]
        // long_fortune=yes
        // offensive_fortune=yes
        // any_fortune=yes
        // foreground=[while,red,green,blue,yellow,black]
        // background=[while,red,green,blue,yellow,black,transparent]
        // text_format=yes
        // preformat_text=yes
        // max_lines=[2 to 999]

        var url = 'http://anduin.eldar.org/cgi-bin/fortune.pl?text_format=yes&any_fortune=yes';
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