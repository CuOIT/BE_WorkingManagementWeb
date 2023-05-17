'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProjectMembers', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          project_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Projects',
              key: 'id',
            },
          },
          member_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'user_id',
            },
          },
          role: {
            type: Sequelize.STRING(50),
            allowNull: false,
          }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProjectMembers');
  }
};
