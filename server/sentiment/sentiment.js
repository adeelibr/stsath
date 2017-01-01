var sentiment = require('sentiment');
var customData = require('./customData.js');
module.exports = function(text) {
  return sentiment(text, customData);
}
