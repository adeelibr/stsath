var twit = require('twit');
var sentimental = require('Sentimental');

var config = require('../../config');

module.exports = {

  choice: function (req, res, next) {
    var choiceOne = req.query.choice_one;
    var choiceTwo = req.query.choice_two;
    // Options Provided By Client
    var choices = [ choiceOne, choiceTwo ];
    // Establish Connection With Twitter
    var twitter = new twit({
      consumer_key: config.twitter.consumer_key,
      consumer_secret: config.twitter.consumer_secret,
      access_token: config.twitter.access_token,
      access_token_secret: config.twitter.access_token_secret
    });

    var highestScore = -Infinity;
    var highestChoice = null;

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var array = [];
    var score = 0;

    var choiceOneArray = [];
    var choiceTwoArray = [];

    // Iterate Through The Choices Array From The Request
    for (var i=0; i < choices.length; i++) {
      // Immediatly invoked function - IIFE
      (function(i) {
        array.push(choices[i]);
        twitter.get('search/tweets', {q: '' + choices[i] + ' since:' + date, count: 4}, function(err, data) {
          // Person Sentimental Anaylysis
          score = performanceAnalysis(data['statuses']);
          console.log('Choice: ' + choices[i] + ' Score: ' + score);
          if (score > highestScore) {
            highestScore = score;
            highestChoice = choices[i];
            console.log('Winner Is: ', highestChoice);
          }
        });
      })(i);
    }

    // setTimeout
    setTimeout(function() {
        res.status(200).json({
          success: true,
          message: "Choices results found",
          choices: choices,
          choicesTweets: [{choiceOneArray, choiceTwoArray}],
          score: highestScore,
          highestChoice: highestChoice,
        }).end();
    }, 5000);
  }

}; // end of module.exports

performanceAnalysis = function(tweetSet) {
  // For Every Choice Initialize tweetSet results to 0
  var results = 0;
  for (var i=0; i < tweetSet.length; i++) {
    var tweet = tweetSet[i]['text'];
    var retweets = tweetSet[i]['retweet_count'];
    var favorites = tweetSet[i]['favorite_count'];
    // Remove all the # hashtags from the tweet text
    tweet = tweet.replace('#', '');
    // # example sentimental.analyze('something'); // Score: -6, Comparative:-1.5
    // returns an array [score, comparative]
    var score = sentimental.analyze(tweet)['score'];
    // Calculate score
    results += score;
    if (score > 0) {
      if (retweets > 0) {
        results += (Math.log(retweets)/Math.log(2));
      }
      if (favorites > 0) {
        results += (Math.log(favorites)/Math.log(2));
      }
    } else if (score < 0) {
      if(retweets > 0) {
        results -= (Math.log(retweets)/Math.log(2));
      }
      if(favorites > 0) {
        results -= (Math.log(favorites)/Math.log(2));
      }
    } else {
      results += 0;
    }
  }
  // return score
  return (results/tweetSet.length);
}
