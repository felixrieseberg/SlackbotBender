var app         = require('../../app'),
    express     = require('express'),
    path        = require('path');

function init(app) {
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, 'public')));
}

module.exports = init;