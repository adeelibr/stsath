var twit = require('twit');
var sentimental = require('Sentimental');

var config = require('../../config');

let choice1 = 'Coke';
let choice2 = 'Pepsi';
let choices = [choice1, choice2];
let choiceArray = [];

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

const twitter = twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.access_token,
  access_token_secret: config.twitter.access_token_secret
});

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

var searchTweets = function(choice) {

  var today = new Date();
  var dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var choiceData = {};
  var score = 0;

  twitter.get('search/tweets',
  {
    q: '' + choice + ' since:' + dateString,
    count: 20
  },
  function(err, data) {
      if (err) {
        // deferred.reject(new Error(err));
        const reason = new Error(err);
        return Promise.resolve(reason);
      } else {
        // perfrom sentiment analysis (see below)
        score = performAnalysis(data['statuses']);
        console.log("score:", score);
        console.log("choice:", choice);

        choiceData['choice'] = choice;
        choiceData['score'] = score;
        // deferred.resolve(choiceData);
        return Promise.resolve(choiceData);
      }
      console.log("");
  });
};

// Compares the scores of the two choices and returns the highest score
var scoreCompare = function(choices){
  var highestScore = -Infinity,
      highestChoice = null,
      result = {};

  choices.forEach(function(choice) {
    if(choice['score'] > highestScore) {
      highestScore = choice['score'];
      highestChoice = choice['choice'];
      console.log("winner:", highestChoice);
      result = {
        choice : highestChoice,
        score : highestScore
      };
    }
  });
  return result;
};


// var choices = JSON.parse(req.body.choices),
//       choiceArray = [];

console.log("----------");

var promise = function(choices) {
  // var deferred = Q.defer();
  choices.forEach(function(choice, index) {
    searchTweets(choice)
    .then(function(data) {
      choiceArray.push(data);
      if (choiceArray.length === choices.length) {
        return Promise.resolve(choiceArray);
      }
    })
    .catch(function(error) {
      throw new Error(error);
    })
  });
  // return deferred.promise;
};

promise(choices)
.then(function(data) {
  return scoreCompare(data);
})
.done(function(result) {
  console.log('final_result', result);
  // res.send(result);
});
