'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ToDoLists', {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date:{
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        isDone:{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull:false,
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
    await queryInterface.dropTable('ToDoLists');
  }
};
