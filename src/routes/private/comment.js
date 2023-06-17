const commentController=require('./../../controllers/commentController')

module.exports=(router)=>{
    router.post('/project/task/comment',commentController.handleAddComment);
    router.delete('/project/task/delete-comment/:id',commentController.handleDeleteComment)
    router.get('/project/task/comments',commentController.handleGetAllComment)
}

