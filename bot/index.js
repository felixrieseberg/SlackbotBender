var express = require('express'),
    router = express.Router(),
    hook = require('slackhook'),
    util = require('util'),
    _s = require('underscore.string'),

    helpers = require('./helpers'),
    triggers = require('./triggers'),

    quotes = require('../integrations/quotes'),
    finance = require('../integrations/finance'),
    help = require('../integrations/help'),
    phonetext = require('../integrations/phonetext'),
    srsly = require('../integrations/srslyGuys'),
    wolframalpha = require('../integrations/wolframalpha'),
    timezones = require('../integrations/timezones'),
    yell = require('../integrations/yell');

function authorize(req, res, next) {
    if (process.env.slacktoken && process.env.slacktoken !== req.body.token) {
        return res.status(401).send('Not authorized');
    }
    return next();
}

function respond(res, text, attachments) {
    attachments = attachments || [];

    res.json({
        text: text,
        username: 'Bender',
        attachments: attachments
    });
}

function botify(req, res){

    var reqText = req.query.text || req.body.text || null;

    reqText = _s.strRight(_s.clean(reqText), 'Bender: ');

    console.log('Request received: ' + reqText);

    if (!reqText) {
        return respond(res, 'Yo, you didn\'t even ask for anything. Gimme a command!');
    }

    // Finance
    if (helpers.containsAny(reqText, triggers.finance)) {
        return finance.getResponse(reqText, respond.bind(this, res));
    }

    // Help
    if (helpers.containsAny(reqText, triggers.help)) {
        return help.sendHelp(respond.bind(this, res));
    }

    // Quotes
    if (helpers.containsAny(reqText, triggers.quotes)) {
        return respond(res, quotes.bender());
    }

    // Text
    if (helpers.containsAny(reqText, triggers.text)) {
        return phonetext.text(reqText, respond.bind(this, res));
    }

    // Ping 
    if (helpers.containsAny(reqText, triggers.ping)) {
        return phonetext.ping(reqText, respond.bind(this, res));
    } 

    // Save Phone Number
    if (helpers.containsAny(reqText, triggers.savenumber)) {
        return phonetext.setNumber(reqText, respond.bind(this, res));
    }

    // Srsly, Guys
    if (helpers.containsAny(reqText, triggers.srsly)) {
        return respond(res, srsly.guys(reqText));
    }

    // Timezones
    if (helpers.containsAny(reqText, triggers.timezones)) {
        return timezones.getTime(reqText, respond.bind(this, res));
    }

    // Wolfram
    if (helpers.containsAny(reqText, triggers.wolfram)) {
        return wolframalpha.getResponse(reqText, respond.bind(this, res));
    }

    // Yell
    if (helpers.containsAny(reqText, triggers.yell)) {
        return yell.getResponse(reqText, respond.bind(this, res));
    }

    return respond(res, 'Yo @' +req.body.user_name + ', I have no idea what you\'re talking about.');

}

router.post('/', authorize, botify);
router.get('/', authorize, botify);

module.exports = router;
