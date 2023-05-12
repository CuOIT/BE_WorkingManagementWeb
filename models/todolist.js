
'use strict'
const {Model} = require('sequelize')

module.exports=(sequelize,DataTypes)=>{
    class ToDoList extends Model {

        static associate(models){
            ToDoList.belongsTo(models.User,{
                foreignKey:'user_id'
            })
        }
    }

    ToDoList.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        isDone:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull:false,
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'User',
                key:'user_id'
            }
        },
    },{
            sequelize,
            modelName: 'ToDoList',
            tableName: 'ToDoLists',
            timestamps: false,
    })
    return ToDoList;
}