'use strict';

var sid = 'ACfa9294cb5a11c1a81b0ff18b7d4b6d5b';
var t = '4c21e947cab43ae4885079d8f2756e96';
var client = require('twilio')(sid, t);

var bros = require('./numbers').people;
var sendingNumber = '+17873392453';

module.exports.sendMessage = function (message) {
    bros
        .forEach(function (geek) {
            client
                .messages
                .create({
                    body: `\nHey ${geek.name},\n${message}\nQuick: http://west.paxsite.com/`,
                    to: geek.number,
                    from: sendingNumber
                }, function (err, data) {
                    if (err) {
                        console.error('Could not notify ' + geek.name);
                        console.error(err);
                    } else {
                        console.log(geek.name + ' notified!');
                    }
                });
        });
};