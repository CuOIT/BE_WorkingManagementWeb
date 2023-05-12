'use strict'
const {Model, DataTypes} = require('sequelize');
module.exports= (sequelize,DataTypes)=>{

    class ToDo extends Model{
        
        static associate(models){
            ToDo.belongsTo(models.ToDoList,{
                foreignKey:'todolist_id'
            })
        }
    };
    ToDo.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          start_time: {
            type: DataTypes.TIME,
            allowNull: true,
            time:true,
          },
          end_time: {
            type: DataTypes.TIME,
            allowNull: true,
            time:true,
          },
          level: {
            type: DataTypes.INTEGER,
            defaultValue: 4,
            validate: {
              min: 1,
              max: 4,
            },
          },
          isDone: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          todolist_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'ToDoList',
                key:'id'
            }
          },
        }, {
          sequelize,
          modelName: 'ToDo',
          tableName: 'ToDos',
          timestamps: false,
    })
    return ToDo;
}