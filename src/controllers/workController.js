const workService=require('../services/workService')

const handleCreateNewWork=async(req,res)=>{
    workService.createNewWork(req.body)
    .then(result=>res.status(201).json(result))
    .catch(error=>res.status(500).json(error))
}

const handleUpdateWork=async(req,res)=>{
    const data={
        id:req.params.id,
        name:req.body.name,
        due_date:req.body.due_date,
        completed:req.body.completed,
        workspace_id:req.body.workspace_id
    }
    const result = await workService.updateWorkById(data);
    res.json(
        result
    )
}

const handleDeleteWork=async (req,res)=>{

        const result = await workService.deleteWorkById(req.params.id);
        res.json(result)
}

const handleGetAllWorkByWorkspaceId=async(req,res)=>{
    const result= await workService.findAllWorkByWorkspaceId(req.query.workspace_id);
    res.json(result) ;
}

// const setStatusForWork= async(req,res)=>{
//     const  
// }

module.exports={
    handleCreateNewWork:handleCreateNewWork,
    handleDeleteWork:handleDeleteWork,
    handleUpdateWork:handleUpdateWork,
    handleGetAllWorkByWorkspaceId:handleGetAllWorkByWorkspaceId
}