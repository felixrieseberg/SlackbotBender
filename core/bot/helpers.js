var _s = require('underscore.string');

var helpers = {
    containsAny: function (str, items, returnMatch) {
        for (var i in items) {
            if (_s.contains(str, items[i])) {
                return (returnMatch) ? items[i] : true;
            }
        }
        return false;
    },

    startsWithAny: function(str, items, returnMatch) {
        for (var i in items) {
            if (_s.startsWith(str, items[i])) {
                return (returnMatch) ? items[i] : true;
            }
        }
        return false;
    },

    strRight: function(str, items) {
        var ret = str;
        for (var i in items) {
            ret = _s.strRight(ret, items[i]);
        }
        return ret;
    },

    randElt: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
};

module.exports = helpers;