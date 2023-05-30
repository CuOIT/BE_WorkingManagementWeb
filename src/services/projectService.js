const db = require("../models/index");

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
            status: data.status || "Pending"
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
        success:"true",
          message: "Successfully created project",
          data: project,
        });
      } catch (error) {
        if (transaction) {
          await transaction.rollback();
        }
        reject({
            success:"false",
            message:"Some errors occured",
  
        });
      }
    });
  };

  const getProjectById = (user_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const projects = await db.ProjectMember.findAll({
          where: {
            member_id: user_id,
          },
        });
  
        if (projects.length > 0) {
          resolve({
            success:"true",
            message: "Successfully retrieved projects",
            data: projects,
          });
        } else {
          resolve({
            success:"false",
            message: "No projects found",
          });
        }
      } catch (error) {
        reject(error);
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
            code: 1,
            message: "No project found",
          });
          return;
        }
        const updatedProject = await project.update(data);
  
        resolve({
            success:"true",
          message: "Successfully updated project",
        });
      } catch (error) {
        reject({
            success:"false",
            message: "No projects found",
          });
      }
    });
  };
  
  const deleteProjectById = (project_id) => {
    return new Promise(async (resolve, reject) => {
 });
  };
  
  module.exports = {
    createProject:createProject,
    getProjectById:getProjectById,
    updateProjectById:updateProjectById,
    deleteProjectById:deleteProjectById

}