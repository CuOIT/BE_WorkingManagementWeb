const db = require('./../models/index');

const createNewWork= async (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
        if( await findWorkByName(data.name,data.workspace_id)){
        console.log(data.name);
            
            reject({
                success:"false",
                message:"Work's name existed"
            })
        }
        const work = await db.Work.create({
            name:data.name,
            due_date:data.due_date,
            isDone:false,
            workspace_id:data.workspace_id
        })
        if(work){
            resolve({
                success:"true",
                message:"Work is created successfully"
            })
        }else{
            reject({
                success:"false",
                message:"Cannot create work"
            })
        }
    }catch(error){
        console.log({error})
        reject({
            success:"false",
            message:"Some errors occured",

        }
            )
    }
    })
}

const findWorkByName=async(name,workspace_id)=>{
    const work=await db.Work.findOne({
        where:{
            name:name,
            workspace_id:workspace_id
        }
    })
    console.log( work?true:false)
    return work?true:false;
}

const findWorkById = async(id)=>{
    try{
        const work= await db.Work.findOne({
            where:{
                id:id
            }
        })
        if(work){
            resolve(work);
        }else reject(null);
    }catch(error){
        reject(null)
    }
}
const updateWorkById= (data)=>{
    return new Promise(async(resolve,reject)=>{
        try{

            const work=await db.Work.findOne({
                where:{
                    id:data.id
                }
            })
            if(work.name!==data.name){
                const workWithName= await findWorkByName(data.name,data.workspace_id);
                if(workWithName){
                    reject({
                        success:"false",
                        message:"Work's name existed"
                    })
                    
                }
            }
            work.name=data.name;
            work.due_date=data.due_date;
            work.isDone=data.isDone;
            work.save();
                resolve({
                    success:"true",
                    message:"Update successfully"
                })
            }catch(error){
                reject({
                    success:"false",
                    message:"Some errors occured"
                })
            }
    })
    }
const deleteWorkById= async(work_id)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const work = await db.Work.findOne({
                where:{
                    work_id:work_id
                }
            })
        if(work){
            await db.Work.destroy({
                where:{
                    id:work_id
                }
            })
            resolve({
                success:"true",
                message:"Delete work successfully"
            })
        }else{
            reject({
                success:"false",
                message:"Cannot delete work"
            })
        }
        }catch(error){
            reject({
                success:"false",
                message:"Some errors occured"
            })
        }
    })
}

const findAllWorkByWorkspaceId=async(workspace_id)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const workList=await db.Work.findAll({
                where:{
                    workspace_id:workspace_id,
                }
            })
            resolve({
                success:"true",
                message:"All work in workspace",
                data: workList,
            });
        }catch(error){
            reject({
                success:"false",
                message:"Some errors occured"
            })
        }
    })
}

module.exports={
    createNewWork:createNewWork,
    deleteWorkById:deleteWorkById,
    findAllWorkByWorkspaceId:findAllWorkByWorkspaceId,
    updateWorkById:updateWorkById
}