const commentService=require('./../services/commentService')

let handleAddComment = async (req, res) => {
    commentService
        .addComment(req.body)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};
let handleDeleteComment = async (req, res) => {
    commentService
        .deleteComment(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

let handleGetAllComment = async (req, res) => {
    commentService
        .getAllComment(req.query.task_id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error));
};

module.exports={
    handleAddComment:handleAddComment,
    handleDeleteComment:handleDeleteComment,
    handleGetAllComment:handleGetAllComment
}