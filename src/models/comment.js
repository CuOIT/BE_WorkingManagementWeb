'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize,DataTypes) => {
 
    class Comment extends Model {
    
        static associate(models) {
      Comment.belongsTo(models.Task, {
        foreignKey: 'task_id'
      });
      Comment.belongsTo(models.User, {
        foreignKey: 'member_id'
      });
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      comment: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'Task',
            key:'id'
        }
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'User',
            key:'user_id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'Comments',
      timestamps: false
    }
  );
  return Comment;
};
