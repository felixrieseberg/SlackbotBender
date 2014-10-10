var _s      = require('underscore.string'),
    debug   = require('debug')('Helpers');

var helpers = {
    /**
     * True if the string contains any of the substrings in items.
     *
     * @function containsAny
     * @param {String} str                  String to search.
     * @param {String[]} items              List of strings to search for.
     * @param {bool} [returnMatch=false]    Whether or not to return the actual matching item from items, or just true.
     * @returns {*}                         True, or the matching item, depending on returnMatch.
     */
    containsAny: function (str, items, returnMatch) {
        for (var i in items) {
            if (_s.contains(str, items[i])) {
                return (returnMatch) ? items[i] : true;
            }
        }
        return false;
    },

    /**
     * True if the string starts with any of the substrings in items.
     *
     * @function startsWithAny
     * @param {String} str                  String to search.
     * @param {String[]} items              List of strings to search for.
     * @param {bool} [returnMatch=false]    Whether or not to return the actual matching item from items, or just true.
     * @returns {*}                         True, or the matching item, depending on returnMatch.
     */
    startsWithAny: function(str, items, returnMatch) {
        for (var i in items) {
            if (_s.startsWith(str, items[i])) {
                return (returnMatch) ? items[i] : true;
            }
        }
        return false;
    },

    /**
     * Extension of underscore.string's strRight to remove a whole list of strings.
     *
     * @function strRight
     * @param {String} str                  String to trim right.
     * @param {String[]} items              Strings to look for and trim.
     * @returns {String}                    Trimmed string.
     */
    strRight: function(str, items) {
        var ret = str;
        for (var i in items) {
            ret = _s.strRight(ret, items[i]);
        }
        return ret;
    },

    /**
     * Cumulative distribution function over an array, allows finer tuning of returned results from randElt.
     *
     * @function cumulativeDistribution
     * @param {int} idx     Index of the array you're computing over.
     * @param {int} length  Length of the array you're computing over.
     * @returns {number}    The cumulative probability of choosing an element at or before this array index.
     */

    /**
     * Return a random element from an array.
     *
     * @function randElt
     * @param {Array} arr                       Array to pick a random result from.
     * @param {cumulativeDistribution} [cdf]    CDF over input space.
     * @returns {*}                             Random element of the array.
     */
    randElt: function(arr, cdf) {
        var chosenIdx = 0;
        if (cdf) {
            var prob = Math.random();
            for (var idx in arr) {
                var curCDF = cdf(idx, arr.length);
                if (prob <= curCDF) {
                    chosenIdx = idx;
                    //debug('Chose index '+chosenIdx+' @ prob '+prob);
                    return arr[chosenIdx];
                }
            }
            chosenIdx = arr.length-1;
            //debug('Chose last index of array '+chosenIdx);
            return arr[chosenIdx];
        } else {
            chosenIdx = Math.floor(Math.random() * arr.length);
            //debug('Chose index '+chosenIdx);
            return arr[chosenIdx];
        }
    }
};

module.exports = helpers;