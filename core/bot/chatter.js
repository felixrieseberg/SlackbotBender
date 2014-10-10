var util                = require('util'),
    _s                  = require('underscore.string'),
    debug               = require('debug')('Chatter'),
    bluebird            = require('bluebird'),
    request             = bluebird.promisify(require('request')),

    helpers             = require('./helpers'),
    triggers            = require('./triggers'),

// Integrations & Tricks
    cursing             = require('./integrations/cursing'),
    quotes              = require('./integrations/quotes'),
    srsly               = require('./integrations/srslyGuys'),
    wolframalpha        = require('./integrations/wolframalpha'),
    yell                = require('./integrations/yell');

function respond (text, attachments) {
    attachments = attachments || [];

    var payload = {
        text: text,
        username: 'Bender',
        attachments: attachments
    };

    var targetUri = process.env.randomChannelWebhookUri;
    if (targetUri) {
        request({ 'method': 'POST', 'uri': targetUri, 'json': payload })
            .then(function (body) {
                debug('Sent '+JSON.stringify(payload)+', received '+JSON.stringify(body));
            })
            .catch(function (e) {
                var status = e.code || 'unknown';
                console.log('Error '+JSON.stringify(e)+', '+status+' sending payload: ' + JSON.stringify(payload));
            });
    } else {
        debug('Would send payload: ' + JSON.stringify(payload));
    }
}

var randomMemes = [
    'overly attached girlfriend',
    'hipster cat',
    'sudden clarity clarence',
    'lame pun coon',
    'confession bear',
    'awkward penguin',
    'bad luck brian'
];

var randomSearchPhrases = [
    'negative entropy',
    'bender',
    'marklar',
    'elephant',
    'cartman',
    'speed of african swallow'
];

var randomYell = [
    'Shut yo mouth!',
    // http://lyrics.wikia.com/Bootsy_Collins:P-Funk_(Wants_To_Get_Funked_Up)
    "Y'all should dig my sunroof top!"
];

function generateReqText() {
    var rand = Math.random();
    if (rand < 1.0) {
        return triggers.curses[0];
    } else if (rand < 0.6) {
        return triggers.quotes[0];
    } else if (rand < 0.8) {
        return helpers.randElt(triggers.srsly) + ' ' + helpers.randElt(randomMemes);
    } else if (rand < 0.9) {
        return triggers.wolfram[0] + ' ' + helpers.randElt(randomSearchPhrases);
    } else {
        return triggers.yell[0] + ' ' + helpers.randElt(randomYell);
    }
}

function chatter () {
    var probToChatter = process.env.chanceToChatter ? parseFloat(process.env.chanceToChatter) : 0.5;
    if (Math.random() > probToChatter) {
        debug('Not chattering');
        return;
    }

    var reqText = generateReqText();

    debug('Generated ' + reqText);

    if (helpers.startsWithAny(reqText, triggers.curses)) {
        return cursing.bender(reqText, respond);
    }

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
