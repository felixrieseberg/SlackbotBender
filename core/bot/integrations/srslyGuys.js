var _         = require('underscore'),
    _s        = require('underscore.string'),
    bing      = require('node-bing-api'),
    debug     = require('debug')('srslyGuys'),

    helpers   = require('../helpers'),
    phrases   = require('../phrases'),
    triggers  = require('../triggers');

function favorFirstCDF(idx, length) {
    switch (idx) {
        case 0: return 0.7;
        case 1: return 0.9;
        default: return (0.1 / (length - 2)) * (idx - 1) + 0.9;
    }
}

var srslyGuys = {

    guys: function (query, key, callback) {
        if (!key && !process.env.bingApiKey) {
            callback(helpers.randElt(phrases.missingKey));
            return;
        }

        var cmd = _s.ltrim(helpers.startsWithAny(query, triggers.srsly, true), '!');
        var q = _s.trim(helpers.strRight(query, triggers.srsly));

        var bingClient = bing({ accKey: key || process.env.bingApiKey, additionalUriParams: "Market='en-us'&$top=20" });
        var adjustedQ = q;
        var predicate = function (result) { return true; };
        switch (cmd) {
            case 'srsly':
                adjustedQ = q + ' gif';
                predicate = function (result) { return result.MediaUrl.endsWith('.gif'); };
                break;

            case 'orly':
                adjustedQ = q + ' meme';
                break;

            case 'wut':
                break;
        }

        bingClient.images(adjustedQ, function (err, res, body) {
            if (err || res.statusCode != 200) {
               var status = res ? res.statusCode : 'unknown';
               debug('Failed call for '+adjustedQ+': '+err+', status='+status);
               callback(phrases.say('errors'));
               return;
            }

            if (!body || !body.d || !body.d.results) {
               callback(phrases.say('noresult'));
               return;
            }

            var validResults = body.d.results.filter(predicate);
            if (validResults) {
               var randomResult = helpers.randElt(validResults, favorFirstCDF);
               callback(randomResult.MediaUrl);
               return;
            }

            callback(phrases.say('noresult'));
            return;
        });
    }
};

module.exports = srslyGuys;