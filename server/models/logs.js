'use strict';
module.exports = function(sequelize, DataTypes) {
  var logs = sequelize.define('logs', {
    user_id: DataTypes.INTEGER,
    detail: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        logs.belongsTo(models.users, {foreignKey: 'user_id'});
      }
    }
  });
  return logs;
};
