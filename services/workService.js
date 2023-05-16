const db = require('./../models/index');

const createNewWork= async (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
        if(findWorkByName(data.name,data.workspace_id)){
            reject({
                success:"false",
                message:"Work's name existed"
            })
        }
        const work = await db.Work.create({
            name:data.name,
            date:data.date,
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
    return work;
}

const  renameWork=async(data)=>{
    const newName= await findWorkByName(data.newName,data.workspace_id);
    if(newName)
        return {
            success:"false",
            message:"Work's name is existed"
        }
    try{
    const work=await findWorkByName(data.oldName,data.workspace_id);
    if(work){
        work.name=data.newName;
        // console.log(work)
        await work.save();
        return{
            success:"true",
            message:"Rename successfully"
        }
    }else{
        return {
            success:"false",
            message:"Cannot find workspace"
        }
    }
    }catch(error){
        console.log({error})
        return {
            success:"false",
            message:"Some errors occured"}
    }
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
    renameWork:renameWork,
    deleteWorkById:deleteWorkById,
    findAllWorkByWorkspaceId:findAllWorkByWorkspaceId
}