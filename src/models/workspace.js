'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class Workspace extends Model{

        static associate(models){
            Workspace.belongsTo(models.User,{
                foreignKey:'user_id'
            })
        }
    }
    Workspace.init({
<<<<<<< HEAD:src/models/workspace.js
          id: {
=======
        id: {
>>>>>>> origin/Chung:models/workspace.js
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'User',
              key: 'user_id',
            },
          },
        }, {
          sequelize,
          modelName: 'Workspace',
          tableName: 'Workspaces',
          timestamps: false,
    });
    return Workspace;
}