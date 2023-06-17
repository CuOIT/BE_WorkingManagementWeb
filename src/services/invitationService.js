const db = require("./../models/index");

const getAllInvitation = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const invitations = await db.Invitation.findAll({
                where: {
                    receiver: user_id,
                },
            });
            resolve({
                success: "true",
                message: "Successfully",
                data: { invitations },
            });
        } catch (error) {
            resolve({
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
        try {
            const invitation = await db.Invitation.findOne({
                where: {
                    id: data.id,
                },
            });

            if (invitation) {
                if (data.response == "true") {
                    console.log({ res: data.response });
                    const newMember = await db.ProjectMember.create({
                        member_id: invitation.receiver,
                        project_id: invitation.project_id,
                        role: "member",
                    });
                    if (newMember) {
                        resolve({
                            success: "true",
                            message: "The receiver has agree the invitation",
                        });
                    }
                } else if (data.response == false) {
                    const result = await db.Invitation.destroy({
                        where: {
                            id: invitation.id,
                        },
                    });
                    if (result)
                        resolve({
                            success: "true",
                            message: "The receiver has decline the invitation",
                        });
                }
            }
            reject({
                success: "false",
                message: "Error occured",
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
    getAllInvitation,
    addInvitation,
    responseInvitation,
};
