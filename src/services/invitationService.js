const db = require("./../models/index");

const getAllInvitation = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const invitations = await db.Invitation.findAll({
                attributes: ["id"],
                include: [
                    {
                        model: db.Project,
                        attributes: [["name", "project_name"]],

                        as: "project",
                    },
                    {
                        model: db.User,
                        attributes: ["user_name"],
                        as: "inviterUser",
                    },
                ],
                where: {
                    receiver: user_id,
                },
            });
            const shortInvitations = invitations.map((item) => {
                const newItem = {
                    id: item.id,
                    project_name: item.project.dataValues.project_name,
                    inviter: item.inviterUser.user_name,
                };
                console.log(item.project.dataValues.project_name);
                return newItem;
            });
            resolve({
                success: "true",
                message: "Successfully",
                data: shortInvitations,
            });
        } catch (error) {
            reject({
                success: "false",
                message: "Error occured",
            });
        }
    });
};

const addInvitation = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const invitation = await db.Invitation.create({
                inviter: data.inviter,
                receiver: data.receiver,
                project_id: data.project_id,
                created_at: data.created_at,
            });
            if (invitation) {
                resolve({
                    success: "true",
                    message: "Add invitation successfully",
                    data: invitation,
                });
            } else {
                reject({
                    success: "false",
                    message: "Cannot add invitation",
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

const responseInvitation = (data) => {
    return new Promise(async (resolve, reject) => {
        transaction = await db.sequelize.transaction();
        try {
            const invitation = await db.Invitation.findOne({
                where: {
                    id: data.id,
                },
            });
            console.log({ invitation });
            if (invitation) {
                if (data.response == "true") {
                    await db.ProjectMember.create(
                        {
                            member_id: invitation.receiver,
                            project_id: invitation.project_id,
                            role: "member",
                        },
                        { transaction }
                    );
                    await db.Invitation.destroy(
                        {
                            where: {
                                id: data.id,
                            },
                        },
                        { transaction }
                    );
                    await transaction.commit();
                    resolve({
                        success: "true",
                        message: "The receiver has agree the invitation",
                    });
                } else {
                    if (data.response === "false") {
                        await db.Invitation.destroy({
                            where: {
                                id: invitation.id,
                            },
                        });
                        resolve({
                            success: "true",
                            message: "The receiver has decline the invitation",
                        });
                    }
                }
            } else {
                reject({
                    success: "false",
                    message: "Cannot find the invitation",
                });
            }
        } catch (error) {
            transaction.rollback();
            console.log({ error });
            reject({
                success: "false",
                message: "Error occured",
            });
        }
    });
};

module.exports = {
    getAllInvitation,
    addInvitation,
    responseInvitation,
};
