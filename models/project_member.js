'use strict'
const {Model} = require('sequelize');

module.exports=(sequelize,DataTypes)=>{

    class ProjectMember extends Model{

        static associate(models){
            models.User.belongsToMany(models.Project,{through:ProjectMember})
        }
    
    }
    ProjectMember.init(
        {
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