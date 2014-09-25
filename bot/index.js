var express = require('express'),
    router = express.Router(),
    hook = require('slackhook'),
    util = require('util'),
    _s = require('underscore.string'),

    helpers = require('./helpers'),
    triggers = require('./triggers'),

    quotes = require('../integrations/quotes'),
    help = require('../integrations/help'),
    wolframalpha = require('../integrations/wolframalpha'),
    timezones = require('../integrations/timezones');

function respond(res, text, attachments) {
    var attachments = attachments || [];

    res.json({
        text: text,
        username: 'Bender',
        attachments: attachments
    });
}

router.post('/', function(req, res){
    var reqText = (req.body.text) ? req.body.text : null,
        reqText = _s.clean(reqText);
        reqText = _s.strRight(reqText, 'Bender: ');

    console.log('Request received: ' + reqText);

    if (!reqText) {
        return res.json({text: 'Yo, you didn\'t even ask for anything. Gimme a command!'});
    }

    // Help
    if (helpers.containsAny(reqText, triggers.help)) {
        return help.sendHelp(respond.bind(this, res));
    }

    // Quotes
    if (helpers.containsAny(reqText, triggers.quotes)) {
        return respond(res, quotes.bender());
    }

    // Timezones
    if (helpers.containsAny(reqText, triggers.timezones)) {
        return timezones.getTime(reqText, respond.bind(this, res));
    }

    // Wolfram
    if (helpers.containsAny(reqText, triggers.wolfram)) {
        return wolframalpha.getResponse(reqText, respond.bind(this, res));
    }

    return respond(res, 'Yo @' +req.body.user_name + ', I have no idea what you\'re talking about.');

});

module.exports = router;
