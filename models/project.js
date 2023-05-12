'use strict'

const {Model} = require('sequelize');

module.exports=(sequelize,DataTypes)=>{

    class Project extends Model{

        static associate(models){
        }
    };
    Project.init(
        {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            name: {
              type: DataTypes.STRING(200),
              allowNull: false,
            },
            start_date: {
              type: DataTypes.DATEONLY,
              allowNull: true,
            },
            end_date: {
              type: DataTypes.DATEONLY,
              allowNull: true,
            },
            description: {
              type: DataTypes.TEXT,
              allowNull: true,
            },
            status: {
              type: DataTypes.STRING(20),
              allowNull: true,
            },
          },
          {
            sequelize,
            modelName: 'Project',
            tableName: 'Projects',
            timestamps: false,
          }
    );
    return Project;
}