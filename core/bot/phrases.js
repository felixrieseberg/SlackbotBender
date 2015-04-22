var helpers = require('./helpers');

var phrases = {

    curses: [
        ''
    ],

    // Quotes
    quotes: [
        'We\'ve woken The Hive!!!',
        'That Wizard came from the moon.'
    ],

    // Finance
    finance_up: [
        ''
    ],

    finance_down: [
        ''
    ],

    finance_nomovement: [
        ''
    ],

    finance_nosymbol: [
        'That\'s not a symbol.'
    ],

    // Various
    noresult: [
        'No results found, Sir.'
    ],

    errors: [
        'Something\'s broken. Life can be hilariously cruel.'
    ],

    textsuccess: [
        ''
    ],

    wolfram: [
        'I asked Wolfram and got this back: '
    ],

    missingKey: [
        'No data without the key.'
    ],

    say: function (type) {
        return helpers.randElt(this[type]);
    }

};

module.exports = phrases;