'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invitations', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          inviter: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'Users',
                key:'user_id'
            }
          },
          receiver: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'Users',
                key:'user_id'
            }
          },
          project_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model:'Projects',
                key:'id'
            }
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Invitations');
  }
};
