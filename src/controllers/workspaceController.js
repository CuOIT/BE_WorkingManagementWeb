const workspaceService= require('../services/workspaceService')

const handleCreateNewWorkspace=async(req,res)=>{
    workspaceService.createNewWorkspace(req.body)
    .then(workspace=>{
        res.status(201).json(
            {
                success:"true",
                message:"Workspace's created successfully"
            }
        )
    })
    .catch(error=>{
        res.status(500).json({
            success:"false",
            message:error
        })

    })
}

const handleRenameWorkspace=async(req,res)=>{
    const data={
        id:req.params.id,
        name:req.body.name,
    }
    workspaceService.renameWorkspace(data)
    .then(result=>{
        res.status(200).json({
            success:"true",
            message:"Rename successfully"
        })
    }).catch(error=>{
        res.status(500).json({
            success:"false",
            message:error
        })
    })
}

const handleDeleteWorkspace=(req,res)=>{
    
    workspaceService.deleteWorkspaceById(req.params.id)
    .then(result=>{
        if(result>=1)
            res.status(204).json({
                success:"true"
            });
        else{
            res.status(400).json({
                success:"false",
                message:"Cannot find workspace"
            })
        }
    })
    .catch(error=>{
        res.status(500).json({
            success:"false",
            message:error
        });
    })
}

const handleGetAllWorkspaceByUserId=async(req,res)=>{
    
    try{
        const workspaceList=await workspaceService.findAllWorkspaceByUserId(req.query.user_id);
        res.status(200).json({
            success:"true",
            message:"Successfully",
            data: workspaceList
        })
    }catch(error){
        console.log({error})
        res.status(500).json({
            success:"false",
            error:"Error occured"
        })
    }
}
module.exports={
    handleCreateNewWorkspace:handleCreateNewWorkspace, //OKE
    handleRenameWorkspace:handleRenameWorkspace, //OKE
    handleDeleteWorkspace:handleDeleteWorkspace, //OKE
    handleGetAllWorkspaceByUserId:handleGetAllWorkspaceByUserId //OKE
}