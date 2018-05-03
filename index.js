require('dotenv').config();

const Notifier = require('./services/notifier');
const Tracker = require('./services/tracker');
const stringUtils = require('./utils/stringUtils');
const dbContext = require('./services/dbContext');
const map = require('lodash/map');

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

dbContext.getTwitterAccounts((accounts) => {
    const streamIds = map(accounts, 'streamID');

    Tracker.track(streamIds, keywords, function (error, tweet) {
        if (error) {
            console.log(error);
            return;
        }

        const tweetText = tweet
            .text
            .toLowerCase();

        valid = verifyChannel(tweet, accounts);
        console.log(valid);

        const notify = keywords.findIndex(function (kw) {
            return tweetText.indexOf(kw) !== -1;
        }) !== -1 && valid;

        if (notify) {
            Notifier.sendMessage(tweet.text);
        }
    });
});

function verifyChannel(tweet, accounts) {
    const screenName = tweet
        .user
        .screen_name
        .toLowerCase();

    // Get all the accounts this application is going to monitor and verify that the
    // tweet came from any of them. This is to avoid retweets from been processed.
    for (let i = 0; i < accounts.length; i++) {
        const element = accounts[i];
        if (screenName == element.ScreenName.toLowerCase()) {
            return true;
        }
    }

    return false;
}