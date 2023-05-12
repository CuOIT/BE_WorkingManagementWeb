'use strict'
const {Model} = require('sequelize');

module.exports=(sequelize,DataTypes)=>{

    class ProjectMember extends Model{

        static associate(models){
            ProjectMember.hasMany(models.User);
            ProjectMember.hasMany(models.Project)
        }
    
    }
    ProjectMember.init(
        {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            project_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: {
                model: 'Project',
                key: 'id',
              },
            },
            member_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: {
                model: 'User',
                key: 'user_id',
              },
            },
            role: {
              type: DataTypes.STRING(50),
              allowNull: false,
            },
          },
          {
            sequelize,
            modelName: 'ProjectMember',
            tableName: 'ProjectMembers',
            timestamps: false,
          }

    )
    return ProjectMember;
}

