'use strict';

const Twitter = require('twitter');
const client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
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
