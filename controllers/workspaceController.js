
const workspaceService= require('./../services/workspaceService')

const handleCreateNewWorkspace=async(req,res)=>{
    const status= await workspaceService.createNewWorkspace(req.body);
    if(status)
        return res.status(200).json({
            success:"true",
            message:"Workspace is created successfully"
        });
    else return res.status(500).json({
            success:"false",
            error:"Cannot create new workspace"
    })
}

const handleRenameWorkspace=async(req,res)=>{
    const data={
        user_id:req.params.user_id,
        oldName:req.body.oldName,
        newName:req.body.newName
    }
    const result=await workspaceService.renameWorkspace(data);
    res.json({
        result
    })
}

const handleDeleteWorkspace=async(req,res)=>{
    const data={user_id:req.params.user_id,name:req.query.name};
    const result = await workspaceService.deleteWorkspaceByName(data);
    res.json({
        result
    })
}

const handleGetAllWorkspaceByUserId=async(req,res)=>{
    
    try{
        const workspaceList=await workspaceService.findAllWorkspaceByUserId(req.params);
        res.status(200).json({
            success:"true",
            data: workspaceList
        })
    }catch(error){
        console.log({error})
        res.status(500).json({
            success:"false",
            error:"Lỗi"
        })
    }
}
module.exports={
    handleCreateNewWorkspace:handleCreateNewWorkspace, //OKE
    handleRenameWorkspace:handleRenameWorkspace, //OKE
    handleDeleteWorkspace:handleDeleteWorkspace, //OKE
    handleGetAllWorkspaceByUserId:handleGetAllWorkspaceByUserId //OKE
}