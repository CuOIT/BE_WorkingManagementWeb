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
                    success:"true",
                    message:"Add invitation successfully"
                });
            }else{
                reject({
                    success:"false",
                    message:"Cannot add invitation"
                })
            }
        }catch(error){
            reject({
                success:"false",
                message:"Error occured"
            })
        }
     
    })
}

const responseInvitation = (data)=>{
    return Promise(async (resolve,reject)=>{
        try{

            const invitation=db.Invitation.findOne({
                where:{
                id:data.id  
            }
        })
        if(invitation){
            if(data.response==true){
                const newMember = await db.ProjectMember.create({
                    member_id:invitation.receiver,
                    project_id:invitation.project_id,
                    role:"member"
                })
                if(newMember){
                    resolve({
                        success:"true",
                        message:"The receiver has agree the invitation"
                    })
                }
            }else if(data.response==false){
                const result = await db.Invitation.destroy({
                    where:{
                        id:invitation.id
                    }
                })
                if(result) resolve({
                    success:"true",
                    message:"The receiver has decline the invitation"
                })
            }
        }
        reject({
            success:"false",
            message:"Error occured"
        })
    }catch(error){
        reject({
            success:"false",
            message:"Error occured"
        })
    }
    })
}

const getAllInvitation = (user_id)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const invitations= await db.Invitation.findAll({
                where:{
                    receiver:user_id
                }
            })
            resolve({
                success:"true",
                message:"Successfully",
                data:{invitations}
            })
        }catch(error){
            resolve({
                success:"false",
                message:"Error occured"
            })
        }
    })
}

const AuthorizeAdmin = (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const admin= await db.ProjectMember.findOne({
                where:{
                    member_id:data.admin_id,
                    role:"admin"
                }
            })
            const member=await db.ProjectMember.findOne({
                where:{
                    member_id:data.member_id,
                    role:"member"
                }
            })
            if(admin && member){
                admin.role="member";
                member.role="admin";
                admin.save();
                member.save();
                if(admin.role==="member" && member.role==="admin") resolve({
                    success:"true",
                    message:"Authorize successfully"
                })
            }
            reject({
                success:"false",
                message:"Error occured"
            })
        }catch(error){
            reject({
                success:"false",
                message:"Error occured"
            })
        }
    })
}

const leaveFromProject = (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const project=await db.ProjectMember.findOne({
                where:{
                    project_id:data.project_id,
                    member_id:data.member_id
                }
            })
            if(project){
                if(project.role==="member"){

                    await db.ProjectMember.destroy({
                        where:{
                            project_id:data.project_id,
                            member_id:data.member_id
                        }
                    })
                    resolve({
                        success:"true",
                        message:"Leave project successfully"
                    })
                }else if(project.role==="admin"){
                    reject({
                        success:"false",
                        message:"Admin cannot leave the project"
                    })
                }
                
            }
            reject({
                success:"false",
                message:"Error occured"
            })
        }catch(error){
            reject({
                success:"false",
                message:"Error occured"
            })
        }
    })
}

