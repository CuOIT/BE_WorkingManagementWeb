const db = require('./../models/index')

const createNewWorkspace = async(data)=>{
        try{
            const found=await db.Workspace.findOne({
                where:{
                    name:data.name,
                    user_id:data.user_id
                },raw:true
            })
            if(found) return false;
            const workspace=await db.Workspace.create(
                {
                    name:data.name,
                    user_id:data.user_id
                } 
            )
            if(!workspace) return false;
            else return true;
            
        }catch(error){
            console.log({error})
            return false;
        }
}

const renameWorkspace=async(data)=>{
    const newName= await findWorkspaceByName(data.newName,data.user_id);
    if(newName)
        return {
            success:"false",
            message:"Name is existed"
        }
    try{
    const workspace=await findWorkspaceByName(data.oldName,data.user_id);
    if(workspace){
        workspace.name=data.newName;
        // console.log(workspace)
        await workspace.save();
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
            message:"Error"}
    }
}


const findWorkspaceByName=async(name,user_id)=>{
    try{
        const workspace = await db.Workspace.findOne({
            where:{
                    name:name,
                    user_id:user_id

        }
        })
        console.log({workspace}) 
        console.log(workspace instanceof db.Workspace)
        return workspace;
    }catch(error){
        console.log({error})
        return undefined;
    }
}

const deleteWorkspaceByName=async(data)=>{
    console.log(data)
    const workspace = await  findWorkspaceByName(data.name,data.user_id);
    if(workspace){
        await db.Workspace.destroy({
            where:{
                name:workspace.name,
                user_id:workspace.user_id
            }
        })
        return {
            success:"true",
            message:"Deleted successfully"
        } 
    }else{
        return {
            success:"false",
            message:"Cannot find workspace"
        }
    }
}   

const findAllWorkspaceByUserId=async(data)=>{
    const workspaceList=await db.Workspace.findAll({
        where:{
            user_id:data.user_id
        }
    })
    return workspaceList;
}
module.exports={
    createNewWorkspace:createNewWorkspace,
    findAllWorkspaceByUserId:findAllWorkspaceByUserId,
    renameWorkspace:renameWorkspace,
    deleteWorkspaceByName:deleteWorkspaceByName,
}