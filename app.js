var express         = require('express'),
    logger          = require('morgan'),
    bodyParser      = require('body-parser'),
    app             = express(),
    bot, webclient, errorHandlers;

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    webclient       = require('./core/webclient/')(app);
    bot             = require('./core/bot/')(app);
    errorHandlers   = require('./core/webclient/errors')(app);

module.exports = app;
