const db = require('../models/index')

const createNewWorkspace =(data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const isExisted=await isExistedWorkspaceOfUserId(data.name,data.user_id);
            if(isExisted)  reject("Workspace's name existed");
            const workspace=await db.Workspace.create(
                {
                    name:data.name,
                    user_id:data.user_id
                } 
                )
            resolve(workspace);        
        }catch(error){
            reject("Error occured");
        }
    })
}

const renameWorkspace=(data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const workspace=await db.Workspace.findOne({where:{id:data.id}});
            if(workspace){
            const user_id=workspace.user_id;
            const isExisted= await isExistedWorkspaceOfUserId(data.name,user_id);
                if(isExisted)
                    reject("Workspace's name existed")
                else{
                    workspace.name=data.name;
                    await workspace.save();
                    resolve(true);
                }
            }else{
                reject("Cannot find workspace");
            }
        }catch(error){
            reject("Error occured");
        }
        })
}
        
const isExistedWorkspaceOfUserId=async(name,user_id)=>{
    const workspace = await db.Workspace.findOne({where:{name,user_id}})
    return workspace?true:false;
}

const deleteWorkspaceById=(id)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const result = await db.Workspace.destroy({where:{id}});
            resolve(result);
        }catch(error){
            reject("Error occured");
        }

})
}   

const findAllWorkspaceByUserId=(user_id)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const workspaceList=await db.Workspace.findAll({where:{user_id}});
            resolve(workspaceList);
        }catch(error){
            reject(error);
        }
    })
}

module.exports={
    createNewWorkspace:createNewWorkspace,
    findAllWorkspaceByUserId:findAllWorkspaceByUserId,
    renameWorkspace:renameWorkspace,
    deleteWorkspaceById:deleteWorkspaceById,
}