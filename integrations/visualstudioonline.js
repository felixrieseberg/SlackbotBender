var vso         = require('vso-client'),
    debug       = require('debug')('VisualStudioOnline'),

    config      = require('../config'),
    client      = vso.createClient(config.vsoUrl, config.vsoCollection, config.vsoUser, config.vsoPassword);

client.getProjects(function(err, projects) {
  if (err) {
    debug(err);
  } else {
    debug(projects);
  }
});

var vso = {

    getResponse: function (reqText, callback) {
        return callback(phrases.quotes[Math.floor(Math.random() * phrases.quotes.length)]);
    }

};

module.exports = vso;