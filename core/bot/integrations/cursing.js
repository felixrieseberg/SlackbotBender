var phrases = require('../phrases'),
    helpers = require('../helpers');

var cursing = {

    bender: function (reqText, callback) {
        var users = process.env.userList ? process.env.userList.split(',') : [ 'slackbot' ];
        var randomUser = helpers.randElt(users);
        return callback(helpers.randElt(phrases.curses).replace('{0}', '@' + randomUser));
    }

};

module.exports = cursing;