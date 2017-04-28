'use strict';

const Twitter = require('twitter');
const client = new Twitter({
    consumer_key: 'lo77TDUbnt6xG6SbeH2oZw0QT',
    consumer_secret: '87nclM4SJKqvACj8QiPfGOfC3nMUseAuUgQWKYQjP1ksgC0klL',
    access_token_key: '140543363-Zjnj6NtJK7VOa8JxMmSv6wMwrIIPODejt6X3eEyx',
    access_token_secret: 'gL9Z9Dpgcfa4L5LRpLbCOBFsk6OJJWtDUj1rrJNrg5PdV'
});

module.exports.track = (streamIds, keywords, cb) => {
    client
        .stream('statuses/filter', {
            follow: [streamIds].toString()
        }, function (stream) {
            console.log('Tracking accounts [' + streamIds + ']');

            stream.on('data', function (data) {
                cb(null, data);
            });

            stream.on('error', function (error) {
                cb(error, null);
            });
        });
};