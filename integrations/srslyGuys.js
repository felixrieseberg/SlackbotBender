var _ = require('underscore'),
    _s = require('underscore.string'),
    bing = require('node-bing-api');

var noApiKey = "No data without the key, meatbag.";

var callFailure = "Apparently, Bing hates you as much as I do.";

var noData = "You can't even search for things correctly, idiot.";

var srslyGuys = {

    guys: function (query, key, callback) {
        var img = _s.trim(_s.strRight(query, 'srsly'));
        if (!key && !process.env.BING_API_KEY) {
            callback(noApiKey);
            return;
        }

        var bingClient = bing({ accKey: key || process.env.BING_API_KEY });
        bingClient.images(img + ' gif', function (err, res, body) {
            if (err || res.statusCode != 200) {
               console.log('Failed call for '+img+': '+err+', status='+res.statusCode);
               callback(callFailure);
               return;
            }

            if (!body || !body.d || !body.d.results) {
               callback(noData);
               return;
            }

            for (var idx in body.d.results) {
               var result = body.d.results[idx];
               if (result.MediaUrl.endsWith('.gif')) {
                   callback(result.MediaUrl);
                   return;
               }
            }

            callback(noData);
            return;
        });
    }
};

module.exports = srslyGuys;