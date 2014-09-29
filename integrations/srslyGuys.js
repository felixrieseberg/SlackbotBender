var _       = require('underscore'),
    _s      = require('underscore.string');

var images = {
    'chipmunk': 'http://25.media.tumblr.com/tumblr_lk14iuHICw1qa6xa3o1_500.gif'
};

var missingImg = 'Bad image, meatbag.';

var srslyGuys = {

    guys: function (query) {
        var img = _s.trim(_s.strRight(query, 'srsly'));
        var text = images[img];
        if (!text) text = missingImg;

        return text;
    }
};

module.exports = srslyGuys;