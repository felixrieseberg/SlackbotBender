var help = {

    helpPayload: [{
        'fallback': 'Seriously dude, if you want to see the command list, do it on a client that supports fancy and long messages.',
        'color': 'good',
        'fields': [
            {
                'title': 'Commands', // The title may not contain markup and will be escaped for you
                'value': '!help: Show\'s this list of available commands.\n' +
                         '!curse [user|someone]: Have Ghost vent his spleen on a colleague.\n' +
                         '!quote ("say something"): Engage with Ghost.\n' +
                         '!orly [something]: Memes..\n' +
                         '!srsly [something]: Gif up some text.\n' +
                         '!ticker: Get the current stock price for a symbol.\n' +
                         '!time ("how late is it in", "how early is it in"): Get\'s the current time for a given location.\n' +
                         '!wolfram ("ask wolfram", "check wolfram"): Queries Wolfram Alpha for a given query.\n' +
                         '!wut [something]: What magic does Bing Image search have in store?\n' +
                         '!yell ("yell"): I will yell things for you.\n',
                'short': false
            }
        ]
    }],

    sendHelp: function (reqText, callback) {
        return callback('Okay, okay, I\'ll tell you how to use this thing.', this.helpPayload);
    }

};

module.exports = help;