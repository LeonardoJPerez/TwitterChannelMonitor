'use strict';

const Notifier = require('./notifier');
const tracker = require('./tracker');

// @Official_PAX Twitter ID: 26281970 @leonardojperez ID: 140543363
var streamIds = process.env.STREAM_IDS || '26281970, 140543363';
var screenName = 'Official_PAX';
var screenName1 = 'leonardojperez';
var keywords = process.env.KEYWORDS || ['ticket', 'badge', 'seattle', 'sale'];

var http = require('http');
http.createServer(function (request, response) {}).listen(process.env.PORT || 5000);

tracker(streamIds, keywords, function (error, tweet) {
    if (error) {
        return console.log(error);
    }

    const tweetText = tweet
        .text
        .toLowerCase();

    const isValidChannel = tweet
        .user
        .screen_name
        .toLowerCase() === screenName.toLowerCase();

    const notify = keywords.findIndex(function (kw) {
        return tweetText.indexOf(kw) !== -1;
    }) !== -1 && isValidChannel;

    if (notify) {
        Notifier.sendMessage(tweetText);
    }
});