const db = require("../models/index");


  const createTodo = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await db.ToDo.create({
          name: data.name,
          start_time: data.start_time,
          end_time: data.end_time,
          level: data.level,
          date :data.date,
          isDone: 0,
          user_id: data.user_id,
        });
  
        if (task) {
          resolve({
            success:"true",
            message:"created todo successfully"
        });
        } else {
          resolve({
            success:"false",
            message: "Error create todo",
          });
        }
      } catch (error) {
        reject({
          success:"false",
          message:"Some errors occured",

      });
      }
    });
  };

  const updateTodoById = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await db.ToDo.findOne({
          where: { id: data.id },
        });
  
        if (task) {
          task.name = data.name;
          task.start_time = data.start_time;
          task.end_time = data.end_time;
          task.level = data.level;
          task.isDone = data.isDone;
  
          await task.save();
  
          resolve({
            success: "true",
            message: "Successfully update Todo",
          });
        } else {
          resolve({
            success: "false",
            message: "Todo not found",
          });
        }
      } catch (error) {
        reject({
          success:"false",
          message:"Some errors occured",

      });
      }
    });
  };

const deleteTodoById = async(todo_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await db.ToDo.findOne({
          where: { id:todo_id },
        });
  
        if (task) {
          await task.destroy();
  
          resolve({
            success: "true",
            message: "Successfully delete Todo",
          });
        } else {
          resolve({
            success: "false",
            message: "Todo not found",
          });
        }
      } catch (error) {
        reject({
          success:"false",
          message:"Some errors occured",

      });
      }
    });
  };

  const getAllTodoByDateAndId = (user_id,date) => {
    return new Promise(async (resolve, reject) => {
      try {
        const tasks = await db.ToDo.findAll({
          where: {
            user_id: user_id,
            date: date,
          }
        });
  
        if (tasks.length > 0) {
          resolve({
            success: "true",
            message: "Successfully retrieved Todo",
            data: tasks,
          });
        } else {
          resolve({
            success: "false",
            message: "No Todo found",
          });
        }
      } catch (error) {
        reject({
          success:"false",
          message:"Some errors occured",

      });
      }
    });
  };


  module.exports = {
    createTodo:createTodo,
    updateTodoById:updateTodoById,
    deleteTodoById:deleteTodoById,
    getAllTodoByDateAndId:getAllTodoByDateAndId
}