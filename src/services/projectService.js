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

const getProjectById = (member_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const projects = await db.ProjectMember.findAll({
            //     where: {
            //         member_id: user_id,
            //     },
            // });

            // if (projects.length > 0) {
            //     resolve({
            //         success: "true",
            //         message: "Successfully retrieved projects",
            //         data: projects,
            //     });
            // } else {
            //     resolve({
            //         success: "false",
            //         message: "No projects found",
            //     });
            // }
            db.sequelize
                .query(
                    "SELECT * FROM projects, projectmembers WHERE projects.id = projectmembers.project_id AND projectmembers.member_id = :member_id",
                    {
                        logging: console.log,
                        type: QueryTypes.SELECT,
                        replacements: { member_id },
                    }
                )
                .then((results) => {
                    resolve({
                        success: "true",
                        message: "Successfully",
                        data: results,
                    }); // Array of results matching the condition
                })
                .catch((error) => {
                    reject({
                        success: "false",
                        messsage: "Error occured",
                    });
                });
        } catch (error) {
            console.log({ error });
            reject({
                success: "false",
                messsage: "Error occured",
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
                resolve({
                    success: "false",
                    message: "No project found",
                });
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
          }else{
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
              } else{
                  const projectMember = await db.ProjectMember.create({
                      project_id: data.project_id,
                      member_id: data.member_id,
                      role: data.role || "member",
                    });
                    resolve({
                      success: "true",
                      message: "Successfully added member to the project"
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


  
  const getUserByProjectId = (projectId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const project = await db.Project.findOne({
            where: {
              id: projectId,
            },
          });
    
          if (!project) {
            resolve({
              success: false,
              message: "Project not found",
            });
          }
        const projectMembers = await db.ProjectMember.findAll({
          where: {
            project_id: projectId,
          },
        });
  
        if (projectMembers.length === 0) {
          resolve({
            success: "true",
            message: "No members found in the project",
          });
        }
  
        const memberPromises = projectMembers.map(async (projectMember) => {
          const user = await db.User.findOne({
            where: {
              user_id: projectMember.member_id,
            },
            attributes: ["user_id", "email","user_name","avt","last_name","first_name","birthday","gender","phone"],
          });
          return {
            user_id: projectMember.member_id,
            role: projectMember.role,
            email: user ? user.email : null,
            user_name: user ? user.user_name : null,
            avt: user ? user.avt : null,
            last_name: user ? user.last_name : null,
            first_name: user ? user.first_name : null,
            birthday: user ? user.birthday : null,
            gender: user ? user.gender : null,
            phone: user ? user.phone : null,
          };
        });
        const members = await Promise.all(memberPromises);
  
        resolve({
          success: "true",
          message: "Successfully retrieved users by project ID",
          data: members,
        });
      } catch (error) {
        reject({
          success: "false",
          message: "Failed to get users by project ID",
          data: [],
          error: error,
        });
      }
    });
  };
  
  
  
  

module.exports = {
    authorizeAdmin,
    leaveFromProject,
    createProject: createProject,
    getProjectById: getProjectById,
    updateProjectById: updateProjectById,
    deleteProjectById: deleteProjectById,
    addMember:addMember,
    getUserByProjectId:getUserByProjectId
};
