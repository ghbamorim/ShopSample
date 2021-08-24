'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Sale','createdAt', Sequelize.DATE);
    queryInterface.addColumn('Sale','updatedAt', Sequelize.DATE);
  },
  down: async (queryInterface) => {
    queryInterface.removeColumn('Sale','createdAt');
    queryInterface.removeColumn('Sale','updatedAt');
  }
};
