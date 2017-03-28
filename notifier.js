'use strict';

var SENDING_NUMBER = '+17873392453';
var SID = 'ACfa9294cb5a11c1a81b0ff18b7d4b6d5b';
var T = '4c21e947cab43ae4885079d8f2756e96';
var client = require('twilio')(SID, T);

var bros = require('./numbers').people;

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