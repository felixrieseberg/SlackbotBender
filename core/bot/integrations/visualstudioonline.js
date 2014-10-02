var _           = require('underscore'),
    _s          = require('underscore.string'),
    vsolib      = require('vso-client'),
    debug       = require('debug')('VisualStudioOnline'),
    bluebird    = require('bluebird'),

    config      = require('../../../config'),
    client      = vsolib.createClient(config.vsoUrl, config.vsoCollection, config.vsoUser, config.vsoPassword);

bluebird.promisifyAll(client);

var vso = {

    getRepositories: function(reqText, callback) {
        var project = (_s.include(reqText, 'for ')) ? _s.strLeftBack(reqText, 'for ') : config.vsoDefaultProject;

        return client.getRepositoriesAsync(project).then(function(response) {
            var result, fields = [];

            debug(response);
            debug('Repositories found: ' + response.length);

            _.each(response, function(repo) {
                debug('Repository:' + repo);
                fields.push({
                    'title': repo.name,
                    'value': 'Default Branch: ' + repo.defaultBranch + '\nRemote URL:' + repo.remoteUrl,
                    'short': false
                });
            });

            result = [{
                'fallback': 'Seriously dude, if you want to see the repos, do it on a client that supports fancy and long messages.',
                'color': 'good',
                'fields': fields
            }];

            callback('Check out the repos!', result);
        });

    },

    getTeams: function (reqText, callback) {
        var project = config.vsoDefaultProject;

        return client.getTeamsAsync(project).then(function(response) {
            var result, fields = [];

            debug('Teams found: ' + response.length);

            _.each(response, function(team) {
                debug('Team:' + team);
                fields.push({
                    'title': team.name,
                    'value': team.description,
                    'short': false
                });
            });

            result = [{
                'fallback': 'Seriously dude, if you want to see the teams list, do it on a client that supports fancy and long messages.',
                'color': 'good',
                'fields': fields
            }];

            callback('Check out the teams!', result);
        });
    }

};

module.exports = vso;