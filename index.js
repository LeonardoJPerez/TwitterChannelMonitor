'use strict';

const Notifier = require('./notifier');
const Tracker = require('./tracker');

// @Official_PAX Twitter ID: 26281970 
// @leonardojperez ID: 140543363
var streamIds = process.env.STREAM_IDS || '26281970, 140543363';
var screenName = 'Official_PAX';
var screenName1 = 'leonardojperez';
var keywords = process.env.KEYWORDS || ['ticket', 'badge', 'seattle', 'sale', 'west', 'pax', '2017'];

Tracker.track(streamIds, keywords, function (error, tweet) {
    if (error) {
        return console.log(error);
    }

    const tweetText = tweet.text.toLowerCase();
    const isCorrectChannel = tweet.user.screen_name.toLowerCase() === screenName.toLowerCase()
        || tweet.user.screen_name.toLowerCase() === screenName1.toLowerCase();

    const notify = keywords.findIndex(function (kw) {
        return tweetText.indexOf(kw) !== -1;
    }) !== -1 && isCorrectChannel;

    if (notify) {
        Notifier.sendMessage(tweetText);
    }
});