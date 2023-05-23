const db = require('./../models/index')


const createNewTask = (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const user_id=data.user_id;
            const project_id=data.project_id;
            const isAdmin=await isAdminOfProject(user_id,project_id);
            if(!isAdmin) reject({
                success:"false",
                message:"No permission"
            })
            const task = await db.Task.create({
                name:data.name,
            description:data.description,
            project_id:data.project_id,
            assigned_to:data.assigned_to,
            due_date:data.due_date,
            status:"Pending"
        })
            if(task){
                resolve({
                    success:"true",
                    message:"Create task successfully"
                })
            }
            reject({
                success:"false",
                message:"Error occured"
            })
    }catch(error){
        reject({
            success:"false",
            message:"Error occured"
        })
    }
    })
}

const editTaskById = (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const user_id=data.user_id;
            const project_id=data.project_id;
            const isAdmin=await isAdminOfProject(user_id,project_id);
            if(!isAdmin) reject({
                success:"false",
                message:"No permission"
            })
            const task = await db.Task.findOne({
                where:{
                    id:data.id
                }
            })
            if(!task) reject({
                success:"false",
                message:"Cannot find task"
            })
            task.name=data.name
            task.description=data.description
            task.assigned_to=data.assigned_to
            due_date=data.due_date
            task.status=data.status
            task.save();
                resolve({
                    success:"true",
                    message:"Create task successfully"
                })
    }catch(error){
        reject({
            success:"false",
            message:"Error occured"
        })
    }
    })
}

const getAllTaskOfProject = (data)=>{
    return new Promise( async (resolve,reject)=>{
        try{

            const tasks = await db.Task.findAll({
                where:{
                    project_id:data.project_id
                }
            })
            resolve({
                success:"true",
                message:"Successfully",
                data:{tasks}
            })
        }catch(error){
            reject({
                success:"false",
                message:"Error occured"
            })
        }
    })
}

const isAdminOfProject = async (data)=>{
    try{
        const user_id=data.user_id;
        const project_id=data.project_id;
        const isAdmin=await db.ProjectMember.findOne({
            where:{
                user_id,
                project_id,
                role:"admin"
            }
        })
        return isAdmin;
    }catch(error){
        return false;   
    }
}
const deleteTaskById = (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const user_id=data.user_id;
            const project_id=data.project_id;
            const isAdmin=await isAdminOfProject(user_id,project_id);
            if(!isAdmin) reject({
                success:"false",
                message:"No permission"
            })
            const task= await db.Task.findOne({
                where:{
                    id:data.id
                }
            })
            if(!task){
                reject({
                    success:"false",
                    message:"Cannot find task"
                })
            }else{
                resolve({
                    success:"true",
                    message:"Delete Task successfully"
                })
            }
        }catch(error){
            reject({
                success:"false",
                message:"Error occured"
            })
        }
    })
}
module.exports={getAllTaskOfProject,createNewTask,editTaskById,deleteTaskById}