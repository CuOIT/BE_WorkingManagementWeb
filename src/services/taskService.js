const db= require('./../models/index')
const addTask = (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const task = await db.Task.create({
                project_id:data.project_id,
                name:data.name,
                description:data.description,
                assigned_to:data.assigned_to,
                due_date:data.due_date,
                status:data.status,
            })
            if(!task){
                reject({
                    success:"false",
                    message:"Error occured"
                })
            }
            resolve({
                success:"true",
                message:"Create task successfully"
            })
            console.log("SV");
        }catch(error){
            reject({
                success:"false",
                message:"Error occured"
            })
        }
    })
}

const updateTask = (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const task = await db.Task.findOne({
                where:{
                    id:data.id
                }
            })
            if(!task){
                reject({
                    success:"false",
                    message:"Cannot find the task"
                })
            }
            task.name=data.name;
            task.description=data.description;
            task.assigned_to=data.assigned_to;
            task.due_date=data.due_date;
            task.status=data.status;
            task.save();
            resolve({
                success:"true",
                message:"Update task successfully"
            })
        }catch(error){
            reject({
                success:"false",
                message:"Error occured"
            })
        }
    })
}

const getAllTaskOfProject = (project_id)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const tasks=await db.Task.findAll({
                where:{
                    project_id
                }
            })
            console.log({tasks})
            resolve({
                success:"true",
                message:"Successfully",
                data:tasks
            })
        }catch(error){
            reject({
                success:"false",
                message:"Error occured"
            })
        }
    })
}
const deleteTask = (id)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const task = db.Task.findOne({
                where:{
                    id
                }
            })
        if(!task){
            reject({
                success:"false",
                message:"Cannot find task"
            })
        }
        db.Task.destroy({
            where:{
                id
            }
        })
        resolve({
            success:"true",
            message:"Delete successfully"
        })
        }catch(error){
            reject({
                success:"false",
                message:"Error occured" 
            })
        }
    })
}
module.exports={
    addTask,
    updateTask,
    getAllTaskOfProject,
    deleteTask
}