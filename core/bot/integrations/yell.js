var _       = require('underscore'),
    _s      = require('underscore.string'),
    util    = require('util'),
    figlet  = require('figlet'),
    debug   = require('debug')('Yell'),
    helpers = require('../helpers'),
    phrases = require('../phrases'),
    yell;

var fonts = [];

yell = {

    render: function (query, callback) {
        figlet.text(query, {
            font: helpers.randElt(fonts)
        }, function (err, data) {
            if (err) {
                console.warn('Figlet error! ' + err + ', ' + data);
                return callback(phrases.say('errors'));
            }
            return callback("```\n" + data + '```');
        });
    },

    getResponse: function (query, callback) {

        query = _s.strRight(query, 'yell');

        if (!fonts) {
            figlet.fonts(function (err, fontList) {
                fonts = fontList;
                return this.render(query, callback);
            });
        } else {
            return this.render(query, callback);
        }
    }

};

module.exports = yell;