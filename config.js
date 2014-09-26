var config = {

    slacktoken: process.env.slacktoken,
    twilioNumber: process.env.twilioNumber || '',
    twilioAccount: process.env.twilioAccount || '',
    twilioToken: process.env.twilioToken || '',
    wolframappid: process.env.wolframappid || ''

};

module.exports = config;