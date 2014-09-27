var getRepoInfo = require('git-repo-info');

function secondsToString(ms) {
    var seconds = ms * 60,
        numdays = Math.floor(seconds / 86400),
        numhours = Math.floor((seconds / 86400) % 3600),
        numminutes = Math.floor(((seconds / 86400) % 3600) / 60),
        numseconds = ((seconds / 86400) % 3600) % 60;

    return numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
};

var development = {

    devPayload: [{
        'fallback': 'You Mammal! If you want to see the dev output, you better use a decent Slack client.',
        'color': 'good',
        'fields': [
            {
                'title': 'Bender Internals',
                'value': 'Last Commit: ' + getRepoInfo().sha + ' (' + getRepoInfo().branch + ')',
                'short': false 
            },
            {
                'title': 'Node Version',
                'value': process.version,
                'short': true 
            },
            {
                'title': 'Architecture',
                'value': process.arch,
                'short': true 
            },
            {
                'title': 'Platform',
                'value': process.platform,
                'short': true 
            },
            {
                'title': 'Memory Usage',
                'value': process.memoryUsage(),
                'short': true 
            },
            {
                'title': 'Uptime',
                'value': secondsToString(process.uptime()),
                'short': true 
            },
        ]
    }],

    getResponse: function (callback) {
        return callback('Baby, be careful. Bender insides are HOT.', this.devPayload);
    }

};

module.exports = development;