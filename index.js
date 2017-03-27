'use strict';

var Twitter = require('twitter');
var AWS = require('aws-sdk');

var client = new Twitter({
    consumer_key: 'lo77TDUbnt6xG6SbeH2oZw0QT',
    consumer_secret: '87nclM4SJKqvACj8QiPfGOfC3nMUseAuUgQWKYQjP1ksgC0klL',
    access_token_key: '140543363-Zjnj6NtJK7VOa8JxMmSv6wMwrIIPODejt6X3eEyx',
    access_token_secret: 'gL9Z9Dpgcfa4L5LRpLbCOBFsk6OJJWtDUj1rrJNrg5PdV'
});

exports.handler = (event, context, callback) => {
    var channel = process.env.CHANNEL || 'leonardojperez';
    var keywords = process.env.KEYWORDS || 'ticket,badge,seattle,sale';

    client.get('statuses/user_timeline', { screen_name: channel }, function (error, tweets, response) {
        if (error) {
            console.log(error);
        }

        var lastTweet = tweets[0];
        console.log('@' + lastTweet.user.screen_name, ': "' + lastTweet.text) + '"';


        // if tweet has keywords, then send sms notification.

        callback(null, 'Finished');
    });
};