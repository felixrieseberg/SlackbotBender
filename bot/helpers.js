var _s = require('underscore.string');

var helpers = {
    containsAny: function (str, items){
        for (var i in items) {
            if (_s.contains(str, items[i])) {
                return true;
            }
        }
        return false;
    }
};

module.exports = helpers;