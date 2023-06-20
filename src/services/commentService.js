const db = require("./../models/index");

const addComment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { task_id, comment, user_id } = data;

            // Kiểm tra xem task có tồn tại không
            const task = await db.Task.findOne({
                where: {
                    id: task_id,
                },
            });

            if (!task) {
                resolve({
                    success: false,
                    message: "Task not found",
                });
            }
            // Lấy thời gian hiện tại
            const currentTime = new Date();
            console.log({ currentTime });
            // Thêm comment vào database
            const createdComment = await db.Comment.create({
                task_id: task_id,
                comment: comment,
                member_id: user_id,
                created_at: currentTime,
            });

            resolve({
                success: true,
                message: "Comment added successfully",
                data: createdComment,
            });
        } catch (error) {
            reject({
                success: false,
                message: "Error occurred",
                error: error,
            });
        }
    });
};

const deleteComment = (commentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deletedComment = await db.Comment.destroy({
                where: {
                    id: commentId,
                },
            });

            if (deletedComment === 0) {
                resolve({
                    success: false,
                    message: "Comment not found",
                });
            }

            resolve({
                success: true,
                message: "Comment deleted successfully",
            });
        } catch (error) {
            reject({
                success: false,
                message: "Error occurred",
                error: error,
            });
        }
    });
};

const getAllComment = (taskId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const task = await db.Task.findOne({
                where: {
                    id: taskId,
                },
            });

            if (!task) {
                resolve({
                    success: "false",
                    message: "Task not found",
                });
            }
            console.log(db.Comment.association);
            const comments = await db.Comment.findAll({
                include: [
                    {
                        model: db.User,
                        attributes: ["user_name"],
                        // as: "user_id",
                    },
                ],
                where: {
                    task_id: taskId,
                },
            });

            resolve({
                success: "true",
                message: "Successfully retrieved comments for the task",
                data: comments,
            });
        } catch (error) {
            console.log({ error });
            reject({
                success: "false",
                message: "Failed to get comments for the task",
            });
        }
    });
};

module.exports = {
    addComment,
    deleteComment,
    getAllComment,
};
