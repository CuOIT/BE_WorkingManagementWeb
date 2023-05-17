'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Projects', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING(200),
            allowNull: false,
          },
          start_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
          },
          end_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          status: {
            type: Sequelize.STRING(20),
            allowNull: true,
          }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Projects');
  }
};
