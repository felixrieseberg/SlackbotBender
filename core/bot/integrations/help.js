var help = {

    helpPayload: [{
        'fallback': 'Seriously dude, if you want to see the command list, do it on a client that supports fancy and long messages.',
        'color': 'good',
        'fields': [
            {
                'title': 'Commands', // The title may not contain markup and will be escaped for you
                'value': '!help: Show\'s this list of available commands.\n' +
                         '!about (!development, "let\'s see your debug info"): Get\'s a bunch of debug info.\n' +
                         '!savenumber [number] [name] ("save phone number [number] for [name]"): Saves a number for a given name.\n' +
                         '!text [number/name] [message] (send text [number/name] [message]): Sends a text message to that phone number or person, if the number is saved.\n' +
                         '!ticker: Get the current stock price for a symbol.\n' +
                         '!time ("how late is it in", "how early is it in"): Get\'s the current time for a given location.\n' +
                         '!ping [number/name] (ping [number/name] [message]): Let\'s that phone number or person know that they\'re needed in the Slack chat.\n' +
                         '!quote ("say something"): Let Bender entertain you!\n' +
                         '!wolfram ("ask wolfram", "check wolfram"): Queries Wolfram Alpha for a given query.\n' +
                         '!vso teams ("Show me our VSO teams"): Lists our Visual Studio Online teams.\n' +
                         '!vso repos ("Show me our VSO repos"): Lists our Visual Studio Online Git repositories.\n' +
                         '!yell ("yell"): Bender will yell stuff for you.\n' +
                         '!curse [user|someone]: Have bender vent his spleen on a colleague.\n',
                'short': false 
            }
        ]
    }],

    sendHelp: function (reqText, callback) {
        return callback('Okay, okay, I\'ll tell you how to use this thing.', this.helpPayload);
    }

};

module.exports = help;