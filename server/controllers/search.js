var twit = require('twit');
var sentimental = require('Sentimental');

var config = require('../../config');

var twitter = new twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.access_token,
  access_token_secret: config.twitter.access_token_secret
});

exports.choice = function (req, res, next)  {
    var choiceOne = req.query.choice_one;
    var choiceTwo = req.query.choice_two;

    // var today = new Date();
    // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let choiceOneScore = 0;
    let choiceTwoScore = 0;
    let choiceOneTweets = [];
    let choiceTwoTweets = [];

    let highestScore = -Infinity;
    let highestChoice = null;

    getTweets(choiceOne)
    .then((res) => {
      let statuses = res.data.statuses;
      choiceOneTweets = statuses;
      choiceOneScore = performAnalysis(choiceOneTweets);
      return getTweets(choiceTwo)
    })
    .then((res) => {
      let statuses = res.data.statuses;
      choiceTwoTweets = statuses;
      choiceTwoScore = performAnalysis(choiceTwoTweets);
    })
    .then(() => {
      if (choiceOneScore > choiceTwoScore) {
        highestScore = choiceOneScore;
        highestChoice = choiceOne
      } else {
        highestScore = choiceTwoScore;
        highestChoice = choiceTwo;
      }
    })
    .then(() => {
      res.status(200).json({
        success: true,
        choiceOneScore,
        choiceTwoScore,
        highestScore,
        highestChoice,
        choiceOneTweets,
        choiceTwoTweets
      }).end();
    })
    .catch((err) => {
      console.log('Error is: ', err.message);
    });

}; // end of module.exports

exports.query = function (req, res, next) {
  var word = req.query.word;
  let score = 0;
  let tweets = [];

  getTweets(word)
  .then((res) => {
    tweets = res.data.statuses;
    score = performAnalysis(tweets);
  })
  .then(() => {
    res.status(200).json({
      success: true,
      word,
      score,
      tweets
    }).end();
  })
  .catch((err) => {
    console.log('Error is: ', err.message);
  });
}

const getTweets = function (choice) {
  return twitter.get('search/tweets', {q: '' + choice, count: 100}, function(err, data) {
    if (err) {
      const reason = new Error(err);
      return Promise.reject(reason);
    } else {
      var statuses = data['statuses'];
      return Promise.resolve(statuses);
    }
  });
};
const performAnalysis = function (tweetSet) {
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
