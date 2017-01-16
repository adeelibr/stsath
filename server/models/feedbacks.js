'use strict';
module.exports = function(sequelize, DataTypes) {
  var feedbacks = sequelize.define('feedbacks', {
    person_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    visible: DataTypes.BOOLEAN,
    review: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    siteUseful: DataTypes.STRING,
    siteRecommend: DataTypes.STRING,
    siteDesign: DataTypes.STRING,
    competitors: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        feedbacks.belongsTo(models.users, {foreignKey: 'user_id'});
      }
    }
  });
  return feedbacks;
};
