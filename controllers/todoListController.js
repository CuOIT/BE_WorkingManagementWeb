const {createNewToDoList}=require('./../services/todolistService')

const handleCreateNewToDoList= ()=>{
    return new Promise((resolve,reject)=>{
        try{
            const date=new Date();
            const success=createNewToDoList();
            resolve(success);
        }catch(error){
            reject(error);
        }
    })
}
