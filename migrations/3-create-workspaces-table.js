'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Workspaces', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'user_id',
            },
          }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Workspaces');
  }
};
