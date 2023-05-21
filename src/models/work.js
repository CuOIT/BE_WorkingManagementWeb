'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Work extends Model {

        static associate(models){
          Work.belongsTo(models.Workspace,{
            foreignKey:'workspace_id'
          })
        }
    };

    Work.init({
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          due_date: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          workspace_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Workspace',
              key: 'id',
            },
          },
        }, {
          sequelize,
          modelName: 'Work',
          tableName: 'Works',
          timestamps: false,
        }
        )
        return Work;
}