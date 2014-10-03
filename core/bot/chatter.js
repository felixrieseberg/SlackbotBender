var util                = require('util'),
    _s                  = require('underscore.string'),
    debug               = require('debug')('Chatter'),
    request             = require('request'),

    helpers             = require('./helpers'),
    triggers            = require('./triggers'),

// Integrations & Tricks
    quotes              = require('./integrations/quotes'),
    srsly               = require('./integrations/srslyGuys'),
    wolframalpha        = require('./integrations/wolframalpha'),
    yell                = require('./integrations/yell');

function respond (text, attachments) {
    attachments = attachments || [];

    var payload = {
        text: text,
        username: 'Bender',
        attachments: attachments,
        channel: "#riskyclick"
    };

    if (process.env.randomChannelWebhookUri) {
        request.post({ 'uri': process.env.randomChannelWebhookUri, 'json': payload }, function (err, res, body) {
            if (err || res.statusCode != 200) {
                console.log('Error sending payload: ' + JSON.stringify(payload));
            }
        });
    } else {
        debug('Would send payload: ' + JSON.stringify(payload));
    }
}

var randomPhrases = [
    'overly attached girlfriend',
    'negative entropy',
    'bender',
    'marklar'
];

var randomYell = [
    'Shut yo mouth!',
    "Y'all should dig my sunroof top!"
];

function generateReqText() {
    var rand = Math.random();
    if (rand < 0.6) {
        return triggers.quotes[0];
    } else if (rand < 0.8) {
        return helpers.randElt(triggers.srsly) + ' ' + helpers.randElt(randomPhrases);
    } else if (rand < 0.9) {
        return triggers.wolfram[0] + ' ' + helpers.randElt(randomPhrases);
    } else {
        return triggers.yell[0] + ' ' + helpers.randElt(randomYell);
    }
}

function chatter () {
    var reqText = generateReqText();

    debug('Generated ' + reqText);

    // Quotes
    if (helpers.startsWithAny(reqText, triggers.quotes)) {
        return quotes.bender(reqText, respond);
    }

    // Srsly, Guys
    if (helpers.startsWithAny(reqText, triggers.srsly)) {
        return srsly.guys(reqText, null, respond);
    }

    // Wolfram
    if (helpers.startsWithAny(reqText, triggers.wolfram)) {
        return wolframalpha.getResponse(reqText, respond);
    }

    // Yell
    if (helpers.startsWithAny(reqText, triggers.yell)) {
        return yell.getResponse(reqText, respond);
    }
}

module.exports = chatter;
