var config = {

    slacktoken: process.env.slacktoken,
    twilioNumber: process.env.twilioNumber || '+123456789',
    twilioAccount: process.env.twilioAccount || 'YOURACCOUNT',
    twilioToken: process.env.twilioToken || 'YOURTOKEN',
    wolframappid: process.env.wolframappid || ''

};

module.exports = config;