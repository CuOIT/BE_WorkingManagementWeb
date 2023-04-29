const db = require("../models/index");

let checkEmailExist=(email)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            console.log("email:",email);
            let user=await db.User.findOne({
                where:{
                    email:email
                },raw:true
            })
            if(user){
                resolve(true);
            }else {
                resolve(false);
            }
        }catch(error){
            reject(error);
        }
    })
}
// let hashPassword = (user_password) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let hashedPassword = await bcrypt.hashSync(user_password, salt);
//             resolve(hashedPassword);
//         } catch (error) {
//             reject(error);
//         }
//     })
// }
let createNewUSer = (data) => {
    console.log("Data:",data);
    return new Promise(async (resolve, reject) => {
        try {
            if (data.email === null || data.email === "") {
                resolve({
                    code: 2,
                    message: "Missing required parameters: email"
                })
            }

            if (data.user_name === null || data.user_name === "") {
                resolve({
                    code: 2,
                    message: "Missing required parameters: user_name"
                })
            }

            if (data.password === null || data.password === "") {
                resolve({
                    code: 2,
                    message: "Missing required parameters: user_password"
                })
            }

            let check = await checkEmailExist(data.email);
            if (check == true) {
                resolve({
                    code: 1,
                    message: 'Email has been used'
                })
            } else {
                // let user_password = await hashPassword(data.user_password);
                await db.User.create({
                    email: data.email,
                    name: data.name,
                    password: data.password,
                    phone: data.phone,
                    birthday: data.birthday,
                })
                resolve({
                    code: 0,
                    message: "Successfully created"
                });
            }

        } catch (error) {
            reject(error);
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userToDelete = await db.User.findOne({
                where: { id: id }
            })

            if (userToDelete) {
                await db.User.destroy({
                    where: { id: id }
                })
                resolve({
                    code: 0,
                    message: "Successfully deleted"
                })
            } else {
                resolve({
                    code: 1,
                    message: "User not exist"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let editUserInfoByPhone = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { phone: data.phone },
                raw: false
            })

            if (user) {
                user.user_name = data.user_name;
                user.email = data.email;
                user.birthday = data.birthday;
                user.gender = data.gender === 1 ? true : false;
                user.cart = data.cart;

                await user.save();

                resolve({
                    code: 0,
                    message: 'Successfully updated'
                })
            } else {
                resolve({
                    code: 2,
                    message: 'phone not found'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    checkEmailExist: checkEmailExist,
    createNewUSer: createNewUSer,
}