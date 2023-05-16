const {db}= require('./../models/index')

const getAllToDosByDate = async(date)=>{
    try{

        const todos = await db.Todo.findAll(
            {
                where:{
                    date
                }
            }
            )
        return todos;
    }catch(error){
        reject(error)
    }
}

module.exports={
    getAllToDosByDate:getAllToDosByDate,
}