var express             = require('express'),
    router              = express.Router(),
    util                = require('util'),
    _s                  = require('underscore.string'),
    debug               = require('debug')('Bender-Botify'),

    helpers             = require('./helpers'),
    triggers            = require('./triggers'),

    // Integrations & Tricks
    cursing             = require('./integrations/cursing'),
    development         = require('./integrations/development'),
    finance             = require('./integrations/finance'),
    help                = require('./integrations/help'),
    quotes              = require('./integrations/quotes'),
    phonetext           = require('./integrations/phonetext'),
    srsly               = require('./integrations/srslyGuys'),
    timezones           = require('./integrations/timezones'),
    wolframalpha        = require('./integrations/wolframalpha'),
    visualstudioonline  = require('./integrations/visualstudioonline'),
    yell                = require('./integrations/yell');

function authorize (req, res, next) {
    if (process.env.slacktoken && process.env.slacktoken !== req.body.token) {
        return res.status(401).send('Not authorized');
    }
    return next();
}

function respond (res, text, attachments) {
    attachments = attachments || [];

    res.json({
        text: text,
        username: 'Bender',
        attachments: attachments
    });
}

function botify (req, res){

    var reqText = req.query.text || req.body.text || null;
        reqText = reqText ? _s.strRight(_s.clean(reqText.toLowerCase()), 'bender: ') : reqText;

    debug('Request received: ' + reqText);

    if (!reqText) {
        return respond(res, 'Yo, you didn\'t even ask for anything. Gimme a command!');
    }

    // Cursing
    if (helpers.startsWithAny(reqText, triggers.curses)) {
        return cursing.bender(reqText, respond.bind(this, res));
    }

    // Development
    if (helpers.startsWithAny(reqText, triggers.development)) {
        return development.getResponse(reqText, respond.bind(this, res));
    }

    // Finance
    if (helpers.startsWithAny(reqText, triggers.finance)) {
        return finance.getResponse(reqText, respond.bind(this, res));
    }

    // Help
    if (helpers.startsWithAny(reqText, triggers.help)) {
        return help.sendHelp(reqText, respond.bind(this, res));
    }

    // Quotes
    if (helpers.startsWithAny(reqText, triggers.quotes)) {
        return quotes.bender(reqText, respond.bind(this, res));
    }

    // Text
    if (helpers.startsWithAny(reqText, triggers.text)) {
        return phonetext.text(reqText, respond.bind(this, res));
    }

    // Ping 
    if (helpers.startsWithAny(reqText, triggers.ping)) {
        return phonetext.ping(reqText, respond.bind(this, res));
    } 

    // Save Phone Number
    if (helpers.startsWithAny(reqText, triggers.savenumber)) {
        return phonetext.setNumber(reqText, respond.bind(this, res));
    }

    // Srsly, Guys
    if (helpers.startsWithAny(reqText, triggers.srsly)) {
        return srsly.guys(reqText, req.body.bingApiKey, respond.bind(this, res));
    }

    // Timezones
    if (helpers.startsWithAny(reqText, triggers.timezones)) {
        return timezones.getTime(reqText, respond.bind(this, res));
    }

    // Visual Studio Online - Teams
    if (helpers.startsWithAny(reqText, triggers.vso_teams)) {
        return visualstudioonline.getTeams(reqText, respond.bind(this, res));
    }

    // Visual Studio Online - Repos
    if (helpers.startsWithAny(reqText, triggers.vso_repos)) {
        return visualstudioonline.getRepositories(reqText, respond.bind(this, res));
    }    

    // Wolfram
    if (helpers.startsWithAny(reqText, triggers.wolfram)) {
        return wolframalpha.getResponse(reqText, respond.bind(this, res));
    }

    // Yell
    if (helpers.startsWithAny(reqText, triggers.yell)) {
        return yell.getResponse(reqText, respond.bind(this, res));
    }

    return respond(res, 'Yo @' +req.body.user_name + ', I have no idea what you\'re talking about.');

}

router.post('/', authorize, botify);

module.exports = router;
