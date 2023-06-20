const { log } = require("common");
const db = require("./../models/index");
const { QueryTypes } = require("sequelize");
const authorizeAdmin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log({ data });
            const admin = await db.ProjectMember.findOne({
                where: {
                    member_id: data.admin_id,
                    role: "admin",
                },
            });
            console.log({ admin });
            const member = await db.ProjectMember.findOne({
                where: {
                    member_id: data.member_id,
                    role: "member",
                },
            });
            if (admin && member) {
                admin.role = "member";
                member.role = "admin";
                admin.save();
                member.save();
                if (admin.role === "member" && member.role === "admin")
                    resolve({
                        success: "true",
                        message: "Authorize successfully",
                    });
            }
            reject({
                success: "false",
                message: "Error occured",
            });
        } catch (error) {
            console.log({ error });
            reject({
                success: "false",
                message: "Error occured",
            });
        }
    });
};
const leaveFromProject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const project = await db.ProjectMember.findOne({
                where: {
                    project_id: data.project_id,
                    member_id: data.member_id,
                },
            });
            if (project) {
                if (project.role === "member") {
                    await db.ProjectMember.destroy({
                        where: {
                            project_id: data.project_id,
                            member_id: data.member_id,
                        },
                    });
                    resolve({
                        success: "true",
                        message: "Leave project successfully",
                    });
                } else if (project.role === "admin") {
                    reject({
                        success: "false",
                        message: "Admin cannot leave the project",
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

const createProject = (data) => {
    return new Promise(async (resolve, reject) => {
        let transaction;

        try {
            transaction = await db.sequelize.transaction();

            const project = await db.Project.create(
                {
                    name: data.name,
                    start_date: data.start_date,
                    end_date: data.end_date,
                    description: data.description,
                    status: data.status || "Pending",
                },
                { transaction }
            );

            if (!project) {
                throw new Error("Error creating project");
            }

            const projectMember = await db.ProjectMember.create(
                {
                    project_id: project.id,
                    member_id: data.user_id,
                    role: "admin",
                },
                { transaction }
            );

            if (!projectMember) {
                throw new Error("Error adding project member");
            }

            await transaction.commit();

            resolve({
                success: "true",
                message: "Successfully created project",
                data: project,
            });
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            reject({
                success: "false",
                message: "Some errors occured",
            });
        }
    });
};

const getProjectById = (user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const projects = await db.ProjectMember.findAll({
            //     where: {
            //         member_id: user_id,
            //     },
            // });
            const projectList = await db.sequelize.query(
                `SELECT project_id,name as project_name, role,member_id from Projects , ProjectMembers where Projects.id=ProjectMembers.project_id and member_id=:user_id`,
                { replacements: { user_id }, type: QueryTypes.SELECT }
            );
            console.log(projectList);
            if (projectList.length > 0) {
                resolve({
                    success: "true",
                    message: "Successfully retrieved projects",
                    data: projectList,
                });
            } else {
                resolve({
                    success: "false",
                    message: "No projects found",
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

const updateProjectById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const project = await db.Project.findOne({
                where: {
                    id: data.id,
                },
            });

            if (!project) {
                reject({
                    success: false,
                    message: "No project found",
                });
                return;
            }
            const updatedProject = await project.update(data);

            resolve({
                success: "true",
                message: "Successfully updated project",
            });
        } catch (error) {
            reject({
                success: "false",
                message: "No projects found",
            });
        }
    });
};

const deleteProjectById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const project = await db.Project.findOne({
                where: {
                    id: id,
                },
            });

            if (!project) {
                resolve({
                    success: false,
                    message: "Project not found",
                });
            }

            await db.ProjectMember.destroy({
                where: {
                    project_id: id,
                },
            });

            await db.Project.destroy({
                where: {
                    id: id,
                },
            });

            resolve({
                success: true,
                message: "Successfully deleted project",
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

const addMember = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const project = await db.Project.findOne({
                where: {
                    id: data.project_id,
                },
            });

            if (!project) {
                resolve({
                    success: "false",
                    message: "No project found",
                });
            }
            const user = await db.User.findOne({
                where: {
                    user_id: data.member_id,
                },
            });

            if (!user) {
                resolve({
                    success: "false",
                    message: "User does not exist",
                });
            } else {
                const existingMember = await db.ProjectMember.findOne({
                    where: {
                        project_id: data.project_id,
                        member_id: data.member_id,
                    },
                });

                if (existingMember) {
                    resolve({
                        success: "false",
                        message: "Member already exists in the project",
                    });
                } else {
                    const projectMember = await db.ProjectMember.create({
                        project_id: data.project_id,
                        member_id: data.member_id,
                        role: data.role || "member",
                    });
                    resolve({
                        success: "true",
                        message: "Successfully added member to the project",
                    });
                }
            }
        } catch (error) {
            reject({
                success: false,
                message: "Failed to add member to the project",
                error: error,
            });
        }
    });
};

const getAllMemberOfProject = (project_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(project_id);
            const members = await db.sequelize.query(
                `SELECT user_name, role from ProjectMembers, Users WHERE member_id=user_id AND project_id= :project_id`,
                {
                    replacements: { project_id },
                    type: QueryTypes.SELECT,
                }
            );
            resolve({
                success: "true",
                message: "Successfully",
                data: members,
            });
        } catch (error) {
            console.log({ error });

            reject({
                success: "false",
                message: "Error occured",
            });
        }
    });
};

module.exports = {
    authorizeAdmin,
    createProject,
    getProjectById,
    updateProjectById,
    deleteProjectById,
    leaveFromProject,
    addMember,
    getAllMemberOfProject,
};
