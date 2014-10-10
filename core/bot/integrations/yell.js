var _       = require('underscore'),
    _s      = require('underscore.string'),
    util    = require('util'),
    figlet  = require('figlet'),
    debug   = require('debug')('Bender-Yell'),
    helpers = require('../helpers'),
    phrases = require('../phrases'),
    yell;

var fonts = [];
function render(query, callback) {
    var font = helpers.randElt(fonts);
    debug('Yelling ['+query+'] in '+font);
    if (query == 'fontlist') {
        return callback(fonts.length + ' Fonts: '+fonts.join(",\n "));
    } else {
        figlet.text(query, {
            font: font
        }, function (err, data) {
            if (err) {
                console.warn('Figlet error! ' + err + ', ' + data);
                return callback(phrases.say('errors'));
            }
            return callback("```\n" + data + '```');
        });
    }
}

yell = {

    getResponse: function (query, callback) {

        query = _s.trim(_s.strRight(query, 'yell'));

        if (!fonts || fonts.length === 0) {
            figlet.fonts(function (err, fontList) {
                if (err) {
                    console.log('Failed getting font-list: '+err);
                } else {
                    fonts = fontList;
                }
                return render(query, callback);
            });
        } else {
            return render(query, callback);
        }
    }

};

module.exports = yell;