var config = {

    slacktoken: process.env.slacktoken,
    twilioNumber: process.env.twilioNumber || '+19143686655',
    twilioAccount: process.env.twilioAccount || 'AC187fee161f0722fdbafadb0c6e714053',
    twilioToken: process.env.twilioToken || '80790faef92edd07e2b2d265e6eeafe6',
    wolframappid: process.env.wolframappid || ''

};

module.exports = config;