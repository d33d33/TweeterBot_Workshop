var Twit = require('twit'),
    fs = require('fs');

var Bot = require('./bot'),
    bot = new Bot({
        consumer_key:         '...',
        consumer_secret:      '...',
        access_token:         '...',
        access_token_secret:  '...'
    });


bot.tweet('I am alive !');
//bot.tweetImage('Ghost #secondchance', '/home/deedee/Desktop/ghost.png');

/*bot.listen('@advbto', function (tweet) {
    var at = tweet.user.screen_name,
        name = tweet.user.name,
        message = tweet.text;

    bot.reply(tweet, 'I am the ADV bot #secondchance');
});*/

/*bot.listen('@advbto', function (tweet) {
    var at = tweet.user.screen_name,
        name = tweet.user.name,
        message = tweet.text;

    bot.replyImage(tweet, 'I am the ADV bot', '/home/deedee/Desktop/ghost.png');
});*/
