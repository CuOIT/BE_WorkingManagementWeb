const workService=require('./../services/workService')

const handleCreateNewWork=async(req,res)=>{
    const result = await workService.createNewWork(req.body);
    if(result.success==="true"){
        res.status(200).json(result);
    }else{
        res.status(500).json(result);
    }
}

const handleRenameWork=async(req,res)=>{
    const data={
        workspace_id:req.params.workspace_id,
        oldName:req.body.oldName,
        newName:req.body.newName
    }
    const result = await workService.renameWork(data);
    res.json(
        result
    )
}

const handleDeleteWork=async (req,res)=>{

        const result = await workService.deleteWorkById(req.params.id);
        res.json(result)
}

const handleGetAllWorkByWorkspaceId=async(req,res)=>{
    const result= await workService.getAllWorkbyWorkspaceId(req.params.workspace_id);
    return result;
}

// const setStatusForWork= async(req,res)=>{
//     const  
// }

module.exports={
    handleCreateNewWork:handleCreateNewWork,
    handleDeleteWork:handleDeleteWork,
    handleRenameWork:handleRenameWork,
    handleGetAllWorkByWorkspaceId:handleGetAllWorkByWorkspaceId
}