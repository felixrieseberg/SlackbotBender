var express = require('express'),
    router = express.Router(),
    hook = require('slackbot'),
    util = require('util'),

    helpers = require('./helpers'),
    triggers = require('./triggers'),
    
    quotes = require('../integrations/quotes'),
    wolframalpha = require('../integrations/wolframalpha'),
    timezones = require('../integrations/timezones');

function respond(res, text) {
    res.json({
        text: text,
        username: 'Bender'
    });
}

router.post('/', function(req, res){
    var reqText = (req.body.text) ? req.body.text : null;

    if (!reqText) {
        res.json({text: 'Yo, you didn\'t even ask for anything. Gimme a command!'});
    }
    
    // Quotes
    if (helpers.containsAny(reqText, triggers.quotes)) {
        res.json({text: quotes.bender()});
    }

    // Timezones
    if (helpers.containsAny(reqText, triggers.timezones)) {
        timezones.getTime(reqText, respond.bind(this, res));
    }

    // Wolfram
    if (helpers.containsAny(reqText, triggers.wolfram)) {
        wolframalpha.getResponse(reqText, respond.bind(this, res));
    }


});

module.exports = router;
