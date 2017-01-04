var twit = require('twit');
// var sentimental = require('Sentimental');
var sentiment = require('../sentiment/sentiment');

var config = require('../../config');

var twitter = new twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.access_token,
  access_token_secret: config.twitter.access_token_secret
});

function validateSearchFormBody (payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.word !== 'string' || payload.word.trim().length === 0) {
    isFormValid = false;
    errors.word = 'Please provide a search query';
  }

  if (!isFormValid) {
    message = 'Check the form for errors';
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

exports.choice = function (req, res, next)  {
    var choiceOne = req.query.choice_one;
    var choiceTwo = req.query.choice_two;

    // var today = new Date();
    // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let choiceOneScore = 0;
    let choiceTwoScore = 0;
    let choiceOneTweets = [];
    let choiceTwoTweets = [];

    getTweets(choiceOne)
    .then((res) => {
      let data = performAnalysis(res.data.statuses);
      choiceOneTweets = data.response;
      choiceOneScore = data.score;
      return getTweets(choiceTwo)
    })
    .then((res) => {
      let data = performAnalysis(res.data.statuses);
      choiceTwoTweets = data.response;
      choiceTwoScore = data.score;
    })
    .then(() => {
      res.status(200).json({
        success: true,
        choiceOneScore,
        choiceTwoScore,
        choiceOneTweets,
        choiceTwoTweets
      }).end();
    })
    .catch((err) => {
      console.log('Error is: ', err.message);
    });

}; // end of module.exports

exports.search = function (req, res, next) {
  const validateResult = validateSearchFormBody(req.query);
  if (!validateResult.success) {
    return res.status(400).json({
      success: false,
      message: validateResult.message,
      errors: validateResult.errors
    }).end();
  }

  let word = req.query.word;

  let tweets = [];
  let score = 0;
  let wordsCount = 0;
  let positiveWordsCount = 0;
  let negativeWordsCount = 0;
  let totalWords = [];
  let positiveWords = [];
  let negativeWords = [];

  getTweets(word)
  .then((res) => {
    let data = performAnalysis(res.data.statuses);
    tweets = data.response;
    score = data.score;
    wordsCount = data.wordsCount;
    positiveWordsCount = data.positiveWordsCount;
    negativeWordsCount = data.negativeWordsCount;
    totalWords = data.totalWords;
    positiveWords = data.positiveWords;
    negativeWords = data.negativeWords;
  })
  .then(() => {
    res.status(200).json({
      success: true,
      word,
      avgerageScore: score,
      data: tweets,
      infographic: {
        wordsCount,
        positiveWordsCount,
        negativeWordsCount,
        totalWords,
        positiveWords,
        negativeWords
      }
    }).end();
  })
  .catch((err) => {
    console.log('Error is: ', err);
    console.log('Error is: ', err.message);
  });
}

const getTweets = function (choice) {
  return twitter.get('search/tweets', {q: '' + choice, count: 15}, function(err, data) {
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
  let results  = 0; // For Every Choice Initialize tweetSet results to 0
  let score = 0;
  let response = [];
  let wordsCount = 0;
  let positiveWordsCount = 0;
  let negativeWordsCount = 0;
  let totalWords = [];
  let positiveWords = [];
  let negativeWords = [];

  for (var i=0; i < tweetSet.length; i++) {

    var resp = {};
    resp.tweet = tweetSet[i];
    resp.sentiment = sentiment(tweetSet[i]['text']);
    resp.sentiment.text = tweetSet[i]['text'];
    resp.sentiment.id = tweetSet[i]['id_str'];
    resp.sentiment.wordsCount = resp.sentiment.words.length;
    resp.sentiment.positiveWordsCount = resp.sentiment.positive.length;
    resp.sentiment.negativeWordsCount = resp.sentiment.negative.length;
    response.push({
      tweet: resp.tweet,
      sentiment: resp.sentiment
    });

    wordsCount += resp.sentiment.words.length;
    positiveWordsCount += resp.sentiment.positive.length;
    negativeWordsCount += resp.sentiment.negative.length;
    totalWords.push(...resp.sentiment.words);
    positiveWords.push(...resp.sentiment.positive);
    negativeWords.push(...resp.sentiment.negative);

    var tweet = tweetSet[i]['text'];
    tweet = tweet.replace('#', ''); // Remove all the # hashtags from the tweet text
    let retweets = tweetSet[i]['retweet_count'];
    let favorites = tweetSet[i]['favorite_count'];

    let Score = sentiment(tweet).score;

    // Calculate score
    results += Score;
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

  score = (results/tweetSet.length);
  data = {
    score,
    response,
    wordsCount,
    positiveWordsCount,
    negativeWordsCount,
    totalWords,
    positiveWords,
    negativeWords
  };
  return data;
}
