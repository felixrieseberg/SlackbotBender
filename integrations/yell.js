var _       = require('underscore'),
    _s      = require('underscore.string'),
    util    = require('util'),
    figlet  = require('figlet'),
    debug   = require('debug')('Yell'),
    yell;

yell = {

    getResponse: function (query, callback) {

        query = _s.strRight(query, 'yell');

        figlet.text(query, {
            font: 'block'            
        }, function(err, data) {
                if (err) {
                    return callback('Figlet error! ' + err + ', ' + data);
                }
                return callback("```\n" + data + '```');
        }); 
    }

};

module.exports = yell;