var twit = require('twit');
var sentiment = require('../sentiment/sentiment');

var models = require('../models');
var Logs = models.logs;

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
function validateChoiceFormBody (payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.choice_one !== 'string' || payload.choice_one.trim().length === 0) {
    isFormValid = false;
    errors.word1 = 'Please provide a word to search';
  }

  if (!payload || typeof payload.choice_two !== 'string' || payload.choice_two.trim().length === 0) {
    isFormValid = false;
    errors.word2 = 'Please provide a word to search';
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
  const validateResult = validateChoiceFormBody(req.query);
  if (!validateResult.success) {
    return res.status(400).json({
      success: false,
      message: validateResult.message,
      errors: validateResult.errors
    }).end();
  }

  var choiceOne = req.query.choice_one;
  var choiceTwo = req.query.choice_two;

  let c1tweets = [];
  let c1score = 0;
  let c1wordsCount = 0;
  let c1positiveWordsCount = 0;
  let c1negativeWordsCount = 0;
  let c1totalWords = [];
  let c1positiveWords = [];
  let c1negativeWords = [];

  let c2tweets = [];
  let c2score = 0;
  let c2wordsCount = 0;
  let c2positiveWordsCount = 0;
  let c2negativeWordsCount = 0;
  let c2totalWords = [];
  let c2positiveWords = [];
  let c2negativeWords = [];

  // Information Passed From isAuth Middleware
  let user = req.decoded.user;
  let logsBody = {
    user_id: user.id,
    detail: `Analysis performed on words: ${choiceOne}, ${choiceTwo}`
  }

  Logs.create(logsBody)
    .then((data) => {
      if(!data) {
        res.status(400).json({ success: false, message: 'Logs Were Not Added.' }).end();
      }
    })
    .catch((error) => {
      return res.status(500).json({ success: false, message: "Internal Server Error", error }).end();
    })

  getTweets(choiceOne)
  .then((res) => {
    // let data = performAnalysis(res.data.statuses);
    // choiceOneTweets = data.response;
    // choiceOneScore = data.score;

    let data = performAnalysis(res.data.statuses);
    c1tweets = data.response;
    c1score = data.score;
    c1wordsCount = data.wordsCount;
    c1positiveWordsCount = data.positiveWordsCount;
    c1negativeWordsCount = data.negativeWordsCount;
    c1totalWords = data.totalWords;
    c1positiveWords = data.positiveWords;
    c1negativeWords = data.negativeWords;


    return getTweets(choiceTwo)
  })
  .then((res) => {
    let data = performAnalysis(res.data.statuses);
    // choiceTwoTweets = data.response;
    // choiceTwoScore = data.score;

    c2tweets = data.response;
    c2score = data.score;
    c2wordsCount = data.wordsCount;
    c2positiveWordsCount = data.positiveWordsCount;
    c2negativeWordsCount = data.negativeWordsCount;
    c2totalWords = data.totalWords;
    c2positiveWords = data.positiveWords;
    c2negativeWords = data.negativeWords;
  })
  .then(() => {
    res.status(200).json({
      success: true,
      wordOne: choiceOne,
      wordTwo: choiceTwo,
      avgScoreChoiceOne: c1score,
      avgScoreChoiceTwo: c2score,
      choiceOneTweets: c1tweets,
      choiceTwoTweets: c2tweets,
      infographicChoiceOne: {
        wordsCount: c1wordsCount,
        positiveWordsCount: c1positiveWordsCount,
        negativeWordsCount: c1negativeWordsCount,
        totalWords: c1totalWords,
        positiveWords: c1positiveWords,
        negativeWords: c1negativeWords
      },
      infographicChoiceOne: {
        wordsCount: c2wordsCount,
        positiveWordsCount: c2positiveWordsCount,
        negativeWordsCount: c2negativeWordsCount,
        totalWords: c2totalWords,
        positiveWords: c2positiveWords,
        negativeWords: c2negativeWords
      }
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

  // Information Passed From isAuth Middleware
  let user = req.decoded.user;
  let logsBody = {
    user_id: user.id,
    detail: 'Analysis performed on word: ' + word,
  }

  Logs.create(logsBody)
    .then((data) => {
      if(!data) {
        res.status(400).json({ success: false, message: 'Logs Were Not Added.' }).end();
      }
    })
    .catch((error) => {
      return res.status(500).json({ success: false, message: "Internal Server Error", error }).end();
    })

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
