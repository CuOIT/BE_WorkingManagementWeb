const db = require('./../models/index')

const addInvitation = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const invitation = await db.Invitation.create({
                inviter:data.inviter,
                receiver:data.receiver,
                project_id:data.project_id,
                created_at:data.created_at
            })
            if(invitation){
                resolve({
                    code: 201,
                    success:"true",
                    message:"Add invitation successfully"
                });
            }else{
                reject({
                    code: 400,
                    success:"false",
                    message:"Cannot add invitation"
                })
            }
        }catch(error){
            reject({
                code:500,
                success:"false",
                message:"Error occured"
            })
        }
     
    })
}
