var _ = require('underscore'),
    _s = require('underscore.string'),
    util = require('util'),
    request = require('request'),
    xmldoc = require('xmldoc'),

    phrases = require('../bot/phrases'),
    wolframalpha;

wolframalpha = {

    makeRequest: function (query, callback) {
        var uri,
            appid = process.env.wolframappid || '';

        if (!appid) {
            return callback("Application key not set", null);
        }

        uri = 'http://api.wolframalpha.com/v2/query?input=' + encodeURIComponent(query);
        uri += '&primary=true&appid=' + appid;

        request(uri, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var doc = new xmldoc.XmlDocument(body),
                    subpods, pods, error, i;

                if (doc.attr.error === true) {
                    console.warn('Wolfram Parsing Error', util.inspect(doc))
                    error = doc.childNamed('error').childNamed('msg').val;
                    callback(error, null);
                } else {
                    pods = doc.childrenNamed('pod');

                    _.map(pods, function(node) {
                        subpods = node.childrenNamed('subpod');
                        _.map(subpods, function(subnode) {
                            return {
                                title: subnode.attr.title,
                                value: subnode.childNamed('plaintext').val,
                                image: subnode.childNamed('img').attr.src,
                            }
                        });

                        return {
                            title: node.attr.title,
                            subpods: subpods, 
                            primary: (node.attr.primary && node.attr.primary === true) ? true : false
                        }
                    })
                    return callback(null, pods);
                }
            } else {
                return callback(error, null)
            }
        })

    },

    executeQuery: function (query, callback) {
        wolfram.query(query, function(error, result) {  
            if (error) {
                console.warn(util.inspect(error));
            }
            callback(result);
        })
    },

    getResponse: function (query, callback) {

        query = _s.strRight(query, 'wolfram');

        wolfram.query(query, function(error, result) {  
            var errorText;

            if (error) {
                console.warn('Wolfram Error', util.inspect(error));
                errorText = phrases.say('error');
                errorText += 'All I got was: ' + error;
                return callback(errorText);
            }
            
            console.log('Wolfram Result \n', util.inspect(result));           
            
            result = _.where(result, {title: 'Result'});

            if (result && result.length > 0 && result[0].subpods[0].value) {
                return callback(phrases.say('wolfram') + result[0].subpods[0].value);
            } else {
                return callback('I asked Wolfram, but didn\'t really understand the response.')
            }
        })
    }

}

module.exports = wolframalpha;