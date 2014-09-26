var _ = require('underscore'),
    _s = require('underscore.string'),
    util = require('util'),
    figlet = require('figlet'),
    yell;

yell = {

    getResponse: function (query, callback) {

        query = _s.strRight(query, 'yell');

        figlet.text(query, {
            font: 'block'            
        }, function(err, data) {
                if (err) {
                    console.log("Figlet error!");
                    return;
                }
                return callback(" \n" + data);
        });    
    }

}

module.exports = yell;