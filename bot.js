var Twit = require('twit'),
    fs = require('fs');

var Bot = module.exports = function(config) {
  this.twit = new Twit(config);
};

Bot.prototype.tweet = function(msg) {
    var twit = this.twit;

    if(typeof msg !== 'string') {
        console.error('tweet must be of type String');
        return;
    } else if(msg.length > 140) {
        console.error('tweet is too long: ' + status.length);
        return;
    }

    twit.post('statuses/update', { status: msg }, function(err, data, response) {
        if(err) {
            console.error('Fail to send tweet: ' + msg);
            return;
        }
        console.log('Tweet sended: ' + msg);
    })
}

Bot.prototype.tweetImage = function(msg, img) {
    var twit = this.twit;

    var b64content = fs.readFileSync(img, { encoding: 'base64' })

    twit.post('media/upload', { media: b64content }, function (err, data, response) {
        var mediaIdStr = data.media_id_string,
            params = { status: msg, media_ids: [mediaIdStr] }

        twit.post('statuses/update', params, function (err, data, response) {
            if(err) {
                console.error('Fail to send tweet: ' + msg);
                return;
          }
          console.log('Tweet sended: ' + msg);
        })
    })
}


Bot.prototype.reply = function(tweet, msg) {
    var twit = this.twit;

    if(!tweet.id || !tweet.user.screen_name) {
        console.error('tweet is not a tweet :/');
        return;
    }
    if(msg.indexOf(tweet.user.screen_name) < 0) {
        msg = '@' + tweet.user.screen_name + ' ' + msg;
    }

    twit.post('statuses/update', { status: msg, in_reply_to_status_id: tweet.id }, function(err, data, response) {
        if(err) {
            console.error('Fail to send tweet: ' + msg);
            return;
        }
        console.log('Tweet sended to: @' + tweet.user.screen_name + ': ' + msg);
    })
}


Bot.prototype.replyImage = function(tweet, msg, img) {
    var twit = this.twit;

    if(!tweet.id || !tweet.user.screen_name) {
        console.error('tweet is not a tweet :/');
        return;
    }
    if(msg.indexOf(tweet.user.screen_name) < 0) {
        msg = '@' + tweet.user.screen_name + ' ' + msg;
    }

    var b64content = fs.readFileSync(img, { encoding: 'base64' });

    twit.post('media/upload', { media: b64content }, function (err, data, response) {
        var mediaIdStr = data.media_id_string,
            params = { status: msg, in_reply_to_status_id: tweet.id, media_ids: [mediaIdStr] }

        twit.post('statuses/update', params, function(err, data, response) {
            if(err) {
                console.error('Fail to send tweet: ' + msg);
                return;
            }
            console.log('Tweet sended to: @' + tweet.user.screen_name + ': ' + msg);
        })
    })
}

Bot.prototype.listen = function (what, onTweet) {
    var stream = this.twit.stream('statuses/filter', { track: what });

    stream.on('tweet', onTweet);
}
