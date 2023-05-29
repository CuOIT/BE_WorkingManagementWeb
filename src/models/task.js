'use strict'
const { Model, DataTypes} = require('sequelize');
module.exports=(sequelize,DataTypes )=>{
    class Task extends Model {
        static associate(models) {
          Task.belongsTo(models.Project, {
            foreignKey: 'id'
          });
          Task.belongsTo(models.User, {
            foreignKey:  'assigned_to'
          });
        }
      }
    
      Task.init({
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        due_date: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        status: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        project_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Projects',
            key: 'id'
          }
        },
        assigned_to: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'user_id'
          }
        }
      }, {
        sequelize,
        modelName: 'Task',
        tableName: 'Tasks',
        timestamps: false
      });
    
      return Task;
}