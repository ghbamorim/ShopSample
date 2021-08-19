'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('User','password', Sequelize.STRING);
  },

  down: async (queryInterface) => {
    queryInterface.removeColumn('User','password');
  }
};
