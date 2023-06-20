const db = require("../models/index");

const createNewWorkspace = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isExisted = await isExistedWorkspaceOfUserId(data.name, data.user_id);
            if (isExisted)
                reject({
                    success: "false",
                    message: "Workspace's name existed",
                });
            const workspace = await db.Workspace.create({
                name: data.name,
                user_id: data.user_id,
            });
            resolve({
                success: "true",
                message: "Create workspace successfully",
                data: workspace,
            });
        } catch (error) {
            reject({
                success: "true",
                message: "Error occured",
            });
        }
    });
};

const renameWorkspace = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const workspace = await db.Workspace.findOne({
                where: { id: data.id },
            });
            if (workspace) {
                const user_id = workspace.user_id;
                const isExisted = await isExistedWorkspaceOfUserId(data.name, user_id);
                if (isExisted)
                    reject({
                        success: "false",
                        message: "Name is existed",
                    });
                else {
                    workspace.name = data.name;
                    await workspace.save();
                    resolve({
                        success: "true",
                        message: "Update successfully",
                    });
                }
            } else {
                reject({
                    success: "false",
                    message: "Cannot find workspace",
                });
            }
        } catch (error) {
            console.log({ error });
            reject({
                success: "false",
                message: "Error occured",
            });
        }
    });
};
const isExistedWorkspaceOfUserId = async (name, user_id) => {
    const workspace = await db.Workspace.findOne({ where: { name, user_id } });
    return workspace ? true : false;
};
const deleteWorkspaceById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            transaction = await db.sequelize.transaction();

            db.Workspace.destroy(
                { where: { id } },
                {
                    transaction,
                }
            )
                .then(async (result) => {
                    await db.Work.destroy(
                        {
                            where: {
                                workspace_id: id,
                            },
                        },
                        {
                            transaction,
                        }
                    );
                    await transaction.commit();
                    resolve({
                        success: "true",
                        message: "Delete workspace successfully",
                    });
                })
                .catch((error) =>
                    reject({
                        success: "false",
                        message: "Error occured",
                    })
                );
        } catch (error) {
            reject({
                success: "false",
                message: "Error occured",
            });
        }
    });
};

const findAllWorkspaceByUserId = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const workspaceList = await db.Workspace.findAll({
                where: { user_id },
            });
            resolve({
                success: "true",
                message: "Successfully",
                data: workspaceList,
            });
        } catch (error) {
            reject({
                success: "false",
                message: "Error occured",
            });
        }
    });
};

module.exports = {
    createNewWorkspace: createNewWorkspace,
    findAllWorkspaceByUserId: findAllWorkspaceByUserId,
    renameWorkspace: renameWorkspace,
    deleteWorkspaceById: deleteWorkspaceById,
};
