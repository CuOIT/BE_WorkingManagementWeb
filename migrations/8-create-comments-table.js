'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          comment: {
            type: Sequelize.STRING(255),
            allowNull: false
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          task_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'Tasks',
                key:'id'
            }
          },
          member_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'Users',
                key:'user_id'
            }
          }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};
