var config = {

    slacktoken: process.env.slacktoken,
    twilioNumber: process.env.twilioNumber || '+123456789',
    twilioAccount: process.env.twilioAccount || 'VAJ5LG-7QYG7Y9UL4',
    twilioToken: process.env.twilioToken || 'YOURTOKEN',
    wolframappid: process.env.wolframappid || 'VAJ5LG-7QYG7Y9UL4',
    vsoUser: process.env.vsoUser || 'feriese@microsoft.com',
    vsoPassword: process.env.vsoPassword || '2l6qVviQ',
    vsoCollection: process.env.vsoCollection || 'DefaultCollection',
    vsoUrl: process.env.vsoUrl || 'https://dpeted.visualstudio.com',
    vsoDefaultProject: process.env.vsoDefaultProject || 'TED Strategic Engagements'

};

module.exports = config;