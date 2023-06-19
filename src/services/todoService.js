const db = require("../models/index");

const createTodo = (data) => {
    console.log({ data });

    return new Promise(async (resolve, reject) => {
        try {
            const todo = await db.ToDo.create({
                name: data.name,
                start_time: data.start_time,
                end_time: data.end_time,
                level: data.level,
                date: data.date,
                completed: 0,
                user_id: data.user_id,
            });

            if (todo) {
                resolve({
                    success: "true",
                    message: "created todo successfully",
                    data: todo,
                });
            } else {
                resolve({
                    success: "false",
                    message: "Error create todo",
                });
            }
        } catch (error) {
            console.log({ error });
            reject({
                success: "false",
                message: "Some errors occured",
            });
        }
    });
};

const updateTodoById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const todo = await db.ToDo.findOne({
                where: { id: data.id },
            });

            if (todo) {
                todo.name = data.name;
                todo.start_time = data.start_time;
                todo.end_time = data.end_time;
                todo.level = data.level;
                todo.completed = data.completed || false;

                await todo.save();

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
                success: "false",
                message: "Some errors occured",
            });
        }
    });
};

const deleteTodoById = async (todo_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const todo = await db.ToDo.findOne({
                where: { id: todo_id },
            });

            if (todo) {
                await todo.destroy();

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
                success: "false",
                message: "Some errors occured",
            });
        }
    });
};

const getAllTodoByDateAndId = (user_id, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            const todos = await db.ToDo.findAll({
                where: {
                    user_id: user_id,
                    date: date,
                },
            });
            resolve({
                success: "true",
                message: "Successfully retrieved Todo",
                data: todos,
            });
        } catch (error) {
            reject({
                success: "false",
                message: "Some errors occured",
            });
        }
    });
};

module.exports = {
    createTodo: createTodo,
    updateTodoById: updateTodoById,
    deleteTodoById: deleteTodoById,
    getAllTodoByDateAndId: getAllTodoByDateAndId,
};
