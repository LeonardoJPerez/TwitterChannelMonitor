const AWS = require("aws-sdk");
var docClient = new AWS
    .DynamoDB
    .DocumentClient();

const RECIPIENTS_TABLE_NAME = process.env.RECIPIENTS_TABLE_NAME || '';
const TWITTER_ACCOUNTS_TABLE_NAME = process.env.TWITTER_ACCOUNTS_TABLE_NAME || '';

module.exports = {
    getRecipients: function (cb) {
        get({
            TableName: RECIPIENTS_TABLE_NAME,
            Select: "ALL_ATTRIBUTES"
        }, cb);
    },
    getTwitterAccounts: function (cb) {
        get({
            TableName: TWITTER_ACCOUNTS_TABLE_NAME,
            Select: "ALL_ATTRIBUTES"
        }, cb);
    }
}

function get(params, cb) {
    docClient
        .scan(params, function (err, data) {
            if (err) 
                console.log(err);
            else 
                cb(data.Items);
            }
        );
}