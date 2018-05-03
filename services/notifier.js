const SENDING_NUMBER = process.env.TWILLIO_FROM_NUMBER || '';
const SID = process.env.TWILLIO_SID || '';
const T = process.env.TWILLIO_TOKEN || '';

const client = require('twilio')(SID, T);
const dbContext = require('./dbContext');

module.exports.sendMessage = function (message) {
    dbContext.getRecipients((recipients) => {
        recipients
            .forEach(function (recipient) {
                const sms = {
                    body: `\nHey ${recipient.Name},\n${message}\nQuick: http://west.paxsite.com/`,
                    to: recipient.PhoneNumber,
                    from: SENDING_NUMBER
                };

                client
                    .messages
                    .create(sms, function (err, data) {
                        if (err) {
                            console.error('Could not notify ' + recipient.Name);
                            console.error(err);
                        } else {
                            console.log(recipient.Name + ' notified!');
                        }
                    });
            });
    });

};
