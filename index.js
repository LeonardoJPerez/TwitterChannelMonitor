const Appinsights = require('./services/appinsights');
const Notifier = require('./services/notifier');
const Tracker = require('./services/tracker');
const stringUtils = require('./utils/stringUtils');

// @Official_PAX Twitter ID:    26281970 @leonardojperez ID:          140543363
var streamIds = process.env.STREAM_IDS || '26281970, 140543363';
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

// require('./initDb')();
// return;

Appinsights.trackEvent("ApplicationStart", {
    streamIds,
    screenNames: [
        screenName, screenName1
    ],
    keywords
});

Appinsights.trackTrace("Application started.");
Appinsights.trackTrace("Tracking...");

Tracker.track(streamIds, keywords, function (error, tweet) {
    if (error) {
        console.log(error);

        Appinsights.trackException(error);
        return;
    }

    Appinsights.trackTrace("Sanitizing tweet text");

    const tweetText = stringUtils.sanitizeTweet(tweet);

    Appinsights.trackTrace("Sanitized: \'" + tweetText + "\'");
    console.log(tweetText);

    const isCorrectChannel = tweet
        .user
        .screen_name
        .toLowerCase() === screenName.toLowerCase(); // || tweet.user.screen_name.toLowerCase() === screenName1.toLowerCase();

    const notify = keywords.findIndex(function (kw) {
        return tweetText.indexOf(kw) !== -1;
    }) !== -1 && isCorrectChannel;

    if (notify) {
        Notifier.sendMessage(tweetText);
        Appinsights.trackTrace("Notification sent!");
    }
});