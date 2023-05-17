'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
 
    class Invitation extends Model {
        static associate(models) {
            Invitation.belongsTo(models.User, {
             foreignKey: 'inviter',
             as: 'inviterUser',
             });

             Invitation.belongsTo(models.User, {
              foreignKey: 'receiver',
              as: 'receiverUser',
             });

             Invitation.belongsTo(models.Project, {
              foreignKey: 'project_id',
              as: 'project',
      });
    }
  }

  Invitation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      inviter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'User',
            key:'user_id'
        }
      },
      receiver: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'User',
            key:'user_id'
        }
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'Project',
            key:'id'
        }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Invitation',
      tableName: 'Invitations',
      timestamps: false,
    }
  );

  return Invitation;
};
