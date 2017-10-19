'use strict';

const SENDING_NUMBER = '+';
const SID = '';
const T = '';
const client = require('twilio')(SID, T);

const bros = require('./numbers').people;

module.exports.sendMessage = function (message) {
    bros.forEach(function (geek) {

        const sms = {
            body: `\nHey ${geek.name},\n${message}\nQuick: http://west.paxsite.com/`,
            to: geek.number,
            from: SENDING_NUMBER
        };

        client.messages.create(sms, function (err, data) {
            if (err) {
                console.error('Could not notify ' + geek.name);
                console.error(err);
            } else {
                console.log(geek.name + ' notified!');
            }
        });
    });
};
