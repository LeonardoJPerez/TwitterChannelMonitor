'use strict';

const Notifier = require('./notifier');
const Tracker = require('./tracker');

// @Official_PAX Twitter ID:    26281970
// @leonardojperez ID:          140543363
var streamIds = process.env.STREAM_IDS || '26281970';
var screenName = 'Official_PAX';
var screenName1 = 'LeonardoJPerez';
var keywords = process.env.KEYWORDS || [
    'ticket',
    'badge',
    'seattle',
    'sale',
    'west',
    'pax',
    '2017',
    'regist'
];

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function sanitizeTweet(tweet) {
    var body =  tweet.text.toLowerCase();
    if (body.indexOf("https://t.co/") === -1) {
        return tweetText;
    }

    // Replace the t.co with actual tweet url.
    // https://twitter.com/{screen_name}/status/id
    var i = body.indexOf("https://t.co/");
    var stringToReplace = body.substring(i);
    var replacement = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;    

    return replaceAll(body, stringToReplace, replacement);
}

Tracker
    .track(streamIds, keywords, function (error, tweet) {
        if (error) {
            console.log(error);
            return;
        }

        const tweetText = sanitizeTweet(tweet);
        console.log(tweetText);

        const isCorrectChannel = tweet.user.screen_name.toLowerCase() === screenName.toLowerCase();
        // || tweet.user.screen_name.toLowerCase() === screenName1.toLowerCase();

        const notify = keywords.findIndex(function (kw) {
            return tweetText.indexOf(kw) !== -1;
        }) !== -1 && isCorrectChannel;

        if (notify) {
            Notifier.sendMessage(tweetText);
        }
    });