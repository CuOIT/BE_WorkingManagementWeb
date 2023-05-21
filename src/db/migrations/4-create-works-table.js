'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Works', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          due_date: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          completed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          workspace_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Workspaces',
              key: 'id',
            },
          }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Works');
  }
};
