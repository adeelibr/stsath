'use strict';
module.exports = function(sequelize, DataTypes) {
  var feedbacks = sequelize.define('feedbacks', {
    person_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    review: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    siteUseful: DataTypes.STRING,
    siteRecommend: DataTypes.STRING,
    siteDesign: DataTypes.STRING,
    competitors: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return feedbacks;
};