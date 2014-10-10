var _       = require('underscore'),
    _s      = require('underscore.string'),
    util    = require('util'),
    request = require('request'),
    debug   = require('debug')('Bender-Finance'),

    phrases = require('../phrases');

function coalesce() {
    for (var i = 0; i < arguments.length; i += 2) {
        if (!isNaN(arguments[i])) {
            return (arguments[i] + ' ' + arguments[i+1]);
        }
    }
    return '-';
}

var finance = {
    getResponse: function (query, callback) {
        var symbol = _s.trim(_s.strRight(query, 'ticker'));
        if (symbol.length > 10 || symbol.match(/\s/)) {
            callback(phrases.say('finance_nosymbol'));
            return;
        }

        var url = 'http://finance.yahoo.com/d/quotes.csv?s=' + symbol + '&f=nabc1p2m8';
        request.get(url, function (err, res, body) {
            if (err || res.statusCode !== 200) {
                debug('Yahoo finance error fetching ' + url + ': ' + err + ', ' + res.statusCode);
                return callback(phrases.say('errors'));
            }

            var data = body.split('\r\n')[0].split(',').map(function (x) { return _s.trim(x, ' \t"'); }),
                name = data.shift();
            if (data.every(function (x) { return x == 'N/A'; })) {
                return callback(phrases.say('finance_nosymbol'));
            }

            var ask = parseFloat(data[1]),
                bid = parseFloat(data[2]),
                change = parseFloat(data[3]),
                changePct = parseFloat(data[4]),
                ma50ChangePct = parseFloat(data[5]);

            var result = name + ' is at ' + coalesce(bid, 'bid', ask, 'ask');
                result += ' (' + coalesce(changePct, '% [Day]', ma50ChangePct, '% [50-day MA]') + ')';

            if (ma50ChangePct > 10 || changePct > 2) {
                result += ", " + phrases.say('finance_up');
            } else if (ma50ChangePct < -10 || changePct < -2) {
                result += ", " + phrases.say('finance_down');
            } else {
                result += ", " + phrases.say('finance_nomovement');
            }

            debug('Responded: ' + result);
            return callback(result);
        });
    }

};

module.exports = finance;