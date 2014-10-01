var config = {

    slacktoken: process.env.slacktoken,
    twilioNumber: process.env.twilioNumber || '+123456789',
    twilioAccount: process.env.twilioAccount || 'YOURACCOUNT',
    twilioToken: process.env.twilioToken || 'YOURTOKEN',
    wolframappid: process.env.wolframappid || '',
    vsoUser: process.env.vsoUser || '',
    vsoPassword: process.env.vsoPassword || '',
    vsoCollection: process.env.vsoCollection || 'DefaultCollection',
    vsoUrl: process.env.vsoUrl || 'https://dpeted.visualstudio.com'

};

module.exports = config;