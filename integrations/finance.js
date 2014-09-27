var _ = require('underscore'),
    _s = require('underscore.string'),
    util = require('util'),
    request = require('request');

function randMsg(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

var upQuotes = [
    "Bribe is such an ugly word. I prefer extortion. The X makes it sound cool.",
    "I love this planet! I've got wealth, fame, and access to the depths of sleaze that those things bring.",
    "You all go without me! I'm gonna take one last look around, you know, for, uh, stuff to steal!",
    "Game's over, losers! I have all the money!! Compare your lives to mine and then kill yourselves!"
];

var downQuotes = [
    "Let's face it, comedy's a dead art form. Tragedy, now that's funny.",
    "Tempers are wearing thin. Let's hope some robot doesn't kill everybody.",
    "This is the worst kind of discrimination. The kind against me!",
    "Oh, so it's just coincidence that Zoidberg is desperately poor and miserably lonely? Please!"
];

var noMovement = [
    "What kind of party is this? There's no booze and only one hooker.",
    "Don't worry, guys. I'll never be too good or too evil again. From now on, I'll just be me."
];

var failure = "Something's broken. Life can be hilariously cruel.";

var badSymbol = "That's not a symbol, ass-hat.";

function coalesce() {
    for (var i = 0; i < arguments.length; i += 2) {
        if (!isNaN(arguments[i])) return (arguments[i] + ' ' + arguments[i+1]);
    }
    return '-';
}

var finance = {

    getResponse: function (query, callback) {

        var symbol = _s.trim(_s.strRight(query, 'ticker'));
        if (symbol.length > 10 || symbol.match(/\s/)) {
            callback(badSymbol);
            return;
        }
        var url = 'http://finance.yahoo.com/d/quotes.csv?s='+symbol+'&f=nabc1p2m8';
        request.get(url, function(err, res, body) {
            if (err || res.statusCode !== 200) {
                console.log("Yahoo finance error fetching "+url+': '+err+', '+res.statusCode);
                callback(failure);
                return;
            }

            var data = body.split('\r\n')[0].split(',').map(function (x) { return _s.trim(x, ' \t"'); }),
                name = data.shift();
            debugger;
            if (data.every(function (x) { return x == 'N/A'; })) {
                callback(badSymbol);
                return;
            }

            var ask = parseFloat(data[1]),
                bid = parseFloat(data[2]),
                change = parseFloat(data[3]),
                changePct = parseFloat(data[4]),
                ma50ChangePct = parseFloat(data[5]);
            var result = name + ' is at ' + coalesce(bid, 'bid', ask, 'ask') +' (' + coalesce(changePct, '%', ma50ChangePct, '% [50-day MA]') + ')';
            if (ma50ChangePct > 10 || changePct > 2) {
                result += ", " + randMsg(upQuotes);
            } else if (ma50ChangePct < -10 || changePct < -2) {
                result += ", " + randMsg(downQuotes);
            } else {
                result += ", " + randMsg(noMovement);
            }
            return callback(result);
        });
    }

};

module.exports = finance;