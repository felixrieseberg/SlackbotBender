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

var finance = {

    getResponse: function (query, callback) {

        query = _s.trim(_s.strRight(query, 'ticker'));
        var url = 'http://finance.yahoo.com/d/quotes.csv?s='+query+'&f=nabc1p2m8';
        request.get(url, function(err, res, body) {
            if (err || res.statusCode !== 200) {
                console.log("Yahoo finance error fetching $url");
                callback(failure);
                return;
            }

            var data = body.split('\n')[0].split(',');
            var name = data[0];
            var ask = parseFloat(data[1]);
            var bid = parseFloat(data[2]);
            var change = parseFloat(data[3]);
            var changePct = parseFloat(data[4]);
            var ma50ChangePct = parseFloat(data[5]);
            var result = name + ' is at ' + bid +' (' + (isNaN(changePct) ? '-' : changePct) + ')';
            if (ma50ChangePct > 10 || changePct > 5) {
                result += ", " + randMsg(upQuotes);
            } else if (ma50ChangePct < -10 || changePct < -5) {
                result += ", " + randMsg(downQuotes);
            } else {
                result += ", " + randMsg(noMovement);
            }
            return callback(result);
        });
    }

};

module.exports = finance;