var help = {

    helpPayload: [{
        'fallback': 'Seriously dude, if you want to see the command list, do it on a client that supports fancy and long messages.',
        'color': 'good',
        'fields': [
            {
                'title': 'Commands', // The title may not contain markup and will be escaped for you
                'value': '!help: Show\'s this list of available commands.\n' +
                         '!time ("how late is it in", "how early is it in"): Get\'s the current time for a given location.\n' +
                         '!quote ("say something"): Let Bender entertain you!\n' +
                         '!wolfram ("ask wolfram", "check wolfram"): Queries Wolfram Alpha for a given query.',
                'short': false 
            }
        ]
    }],

    sendHelp: function (callback) {
        return callback('Okay, okay, I\'ll tell you how to use this thing.', this.helpPayload);
    }

};

module.exports = help;