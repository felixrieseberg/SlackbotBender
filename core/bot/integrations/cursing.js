var _s      = require('underscore.string'),

    helpers = require('../helpers'),
    phrases = require('../phrases'),
    triggers = require('../triggers');

var cursing = {

    bender: function (reqText, callback) {
        var user = _s.trim(helpers.strRight(reqText, triggers.curses));
        if (!user || user == 'someone') {
            var users = process.env.userList ? process.env.userList.split(',') : [ 'slackbot' ];
            user = helpers.randElt(users);
        }
        return callback(phrases.say('curses').replace('{0}', '@' + user));
    }

};

module.exports = cursing;