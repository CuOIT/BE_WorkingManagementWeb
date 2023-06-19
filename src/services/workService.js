const { log } = require("common");
const db = require("./../models/index");

const createNewWork = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const found = await findWorkByName(data.name, data.workspace_id);
            if (found) {
                reject({
                    success: "false",
                    message: "Work's name existed",
                });
            }
            const work = await db.Work.create({
                name: data.name,
                due_date: data.due_date,
                completed: false,
                workspace_id: data.workspace_id,
            });
            if (work) {
                resolve({
                    success: "true",
                    message: "Work is created successfully",
                    data: work,
                });
            } else {
                reject({
                    success: "false",
                    message: "Cannot create work",
                });
            }
        } catch (error) {
            console.log({ error });
            reject({
                success: "false",
                message: "Errors occured",
            });
        }
    });
};

const findWorkByName = async (name, workspace_id) => {
    const work = await db.Work.findOne({
        where: {
            name,
            workspace_id: workspace_id,
        },
    });
    console.log(work ? true : false);
    return work ? true : false;
};

const updateWorkById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log({ data });
            const work = await db.Work.findOne({
                where: {
                    id: data.id,
                },
            });
            console.log(work.toJSON());
            if (work.name !== data.name) {
                console.log({
                    name: data.name,
                    id: data.workspace_id,
                });
                const workWithName = await findWorkByName(data.name, data.workspace_id);
                if (workWithName) {
                    reject({
                        success: "false",
                        message: "Work's name existed",
                    });
                }
            }
            work.name = data.name;
            work.due_date = data.due_date;
            work.completed = data.completed;
            work.save();
            resolve({
                success: "true",
                message: "Update successfully",
            });
        } catch (error) {
            console.log(error);
            reject({
                success: "false",
                message: "Errors occured",
            });
        }
    });
};
const deleteWorkById = async (id) => {
    return new Promise(async (resolve, reject) => {
        db.Work.destroy({ where: { id } })
            .then((result) => {
                if (result)
                    resolve({
                        success: "true",
                        message: "Delete work successfully",
                    });
                else
                    reject({
                        success: "false",
                        message: "Cannot find work",
                    });
            })
            .catch((error) => {
                reject({
                    success: "false",
                    message: "Error occured",
                });
            });
    });
};

const findAllWorkByWorkspaceId = async (workspace_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const workList = await db.Work.findAll({
                where: {
                    workspace_id: workspace_id,
                },
            });
            resolve({
                success: "true",
                message: "All work in workspace",
                data: workList,
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
    createNewWork,
    deleteWorkById,
    findAllWorkByWorkspaceId,
    updateWorkById,
};
