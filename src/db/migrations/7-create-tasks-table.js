'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: Sequelize.STRING(255),
            allowNull: true
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: true
          },
          due_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
          },
          status: {
            type: Sequelize.STRING(50),
            allowNull: false
          },
          project_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Projects',
              key: 'id'
            }
          },
          assigned_to: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'user_id'
            }
          }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tasks');
  }
};
