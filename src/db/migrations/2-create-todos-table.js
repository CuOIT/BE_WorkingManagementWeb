'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ToDos', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          start_time: {
            type: Sequelize.TIME,
            allowNull: true,
            time:true,
          },
          end_time: {
            type: Sequelize.TIME,
            allowNull: true,
            time:true,
          },
          level: {
            type: Sequelize.INTEGER,
            defaultValue: 4,
            validate: {
              min: 1,
              max: 4,
            },
          },
          completed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          date:{
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        user_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references:{
                model:'Users',
                key:'user_id',
                schema:'schema'
            }
        },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ToDos');
  }
};
