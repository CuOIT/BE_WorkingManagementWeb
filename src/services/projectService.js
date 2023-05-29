const db = require('./../models/index')


const authorizeAdmin = (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            console.log({data})
            const admin= await db.ProjectMember.findOne({
                where:{
                    member_id:data.admin_id,
                    role:"admin"
                }
            })
            console.log({admin})
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
            console.log({error})
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

module.exports = {
    authorizeAdmin,
    leaveFromProject
}