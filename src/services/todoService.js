const db = require("../models/index");

const createNewTodoList = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const date = new Date();
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${year}-${month}-${day}`;
            console.log(formattedDate);
            const existingTodoList = await db.ToDoList.findOne({
              where: { user_id: data.user_id, date: formattedDate},
            });
            const isDone = 0;
            if (existingTodoList) {
              // Nếu bản ghi đã tồn tại, trả về lỗi
              resolve({
                code: 2,
                message: "TodoList already exists",
              });
            } else {
              const todoList = await db.ToDoList.create({
                date: formattedDate,
                isDone: isDone,
                user_id:data.user_id,
              });
              if (todoList) {
                resolve({
                    code: 0,
                    message: "Successfully create todoList",
                    data: todoList
                })
              } else {
                resolve({
                    code: 1,
                    message: "Error create todoList"
                })
              }
            }
            } catch (error) {
                reject(error);
            }
    })

  };

  const getTodoList = (user_id,date) => {
    return new Promise(async (resolve, reject) => {
      try {
        const todoList = await db.ToDoList.findOne({
          where: { user_id: user_id, date: date },
        });
  
        if (todoList) {
          resolve({
            code: 0,
            message: "Successfully retrieved todoList",
            data: todoList,
          });
        } else {
          resolve({
            code: 1,
            message: "TodoList not found",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const createTask = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await db.ToDo.create({
          name: data.name,
          start_time: data.start_time,
          end_time: data.end_time,
          level: data.level,
          isDone: 0,
          todolist_id: data.todolist_id,
        });
  
        if (task) {
          resolve({
            code: 0,
            message: "Successfully create task",
            data: task,
          });
        } else {
          resolve({
            code: 1,
            message: "Error create task",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateTask = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await db.ToDo.findOne({
          where: { id: data.task_id, todolist_id: data.todolist_id },
        });
  
        if (task) {
          task.name = data.name;
          task.start_time = data.start_time;
          task.end_time = data.end_time;
          task.level = data.level;
          task.isDone = data.isDone;
  
          await task.save();
  
          resolve({
            code: 0,
            message: "Successfully update task",
            data: task,
          });
        } else {
          resolve({
            code: 1,
            message: "Task not found",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

const deleteTask = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const task = await db.ToDo.findOne({
          where: { id: data.task_id, todolist_id: data.todolist_id },
        });
  
        if (task) {
          await task.destroy();
  
          resolve({
            code: 0,
            message: "Successfully delete task",
          });
        } else {
          resolve({
            code: 1,
            message: "Task not found",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const getAllTask = (todolist_id,user_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const tasks = await db.ToDo.findAll({
          where: { todolist_id: todolist_id },
          include: [
            {
              model: db.ToDoList,
              where: { user_id: user_id },
            },
          ],
        });
  
        if (tasks.length > 0) {
          resolve({
            code: 0,
            message: "Successfully retrieved tasks",
            data: tasks,
          });
        } else {
          resolve({
            code: 1,
            message: "No tasks found",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteTodolist = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Xóa tất cả các công việc trong danh sách công việc
        await db.ToDo.destroy({
          where: { todolist_id: data.todolist_id },
        });
  
        // Xóa danh sách công việc
        const result = await db.ToDoList.destroy({
          where: { id: data.todolist_id, user_id: data.user_id },
        });
  
        if (result === 1) {
          resolve({
            code: 0,
            message: "Successfully delete todolist and its tasks",
          });
        } else {
          resolve({
            code: 1,
            message: "Todolist not found",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  module.exports = {
    createNewTodoList: createNewTodoList,
    getTodoList:getTodoList,
    createTask:createTask,
    updateTask:updateTask,
    deleteTask:deleteTask,
    getAllTask:getAllTask,
    deleteTodolist:deleteTodolist

}