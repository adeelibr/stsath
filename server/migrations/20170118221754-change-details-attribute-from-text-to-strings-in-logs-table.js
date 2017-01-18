'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'logs',
      'detail',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'logs',
      'detail',
      {
        type: Sequelize.TEXT,
      }
    );
  }
};
