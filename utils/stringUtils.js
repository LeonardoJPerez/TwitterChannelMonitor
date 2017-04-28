const escapeRegExp = (str) => {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

module.exports = {
    replaceAll,
    sanitizeTweet: (tweet) => {
        var body = tweet
            .text
            .toLowerCase();
        if (body.indexOf("https://t.co/") === -1) {
            return tweetText;
        }

        // Replace the t.co with actual tweet url.
        // https://twitter.com/{screen_name}/status/id
        var i = body.indexOf("https://t.co/");
        var stringToReplace = body.substring(i);
        var replacement = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;

        return replaceAll(body, stringToReplace, replacement);
    }
}