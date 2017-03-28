'use strict';

var Notifier = require('./notifier');
var tracker = require('./tracker');

// @Official_PAX Twitter ID: 26281970
// @leonardojperez ID: 140543363
var streamIds = process.env.STREAM_IDS || '26281970';
var keywords = process.env.KEYWORDS || ['ticket', 'badge', 'seattle', 'sale'];

tracker(streamIds, keywords, function (error, tweet) {
    if (error) {
        return console.log(error);
    }

    let tweetText = tweet.text;
    var notify = keywords.findIndex(function (kw) {
        return tweetText.indexOf(kw) !== -1;
    }) !== -1;

    if (notify) {
        Notifier.sendMessage(tweetText);
    }
});