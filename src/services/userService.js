const db = require("../models/index");

let checkEmailExist= async (email)=>{
    let user=await db.User.findOne({
        where:{
            email:email
        },raw:true
    })
    return user?true:false;
}
// let hashPassword = (password) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let hashedPassword = await bcrypt.hashSync(password, salt);
//             resolve(hashedPassword);
//         } catch (error) {
//             reject(error);
//         }
//     })
// }
let handleLogin = async (email, password) => {
        let checkUserExist = await checkEmailExist(email);
        if (checkUserExist) {
            let user = await db.User.findOne({
                where: {
                    email: email,
                }, raw: true
            });
            if (user) {
                let checkPassword = password === user.password;
                if (checkPassword) {
                    delete user.password;
                    return user;
                }
            }
        } else {
            return null;
        }
}
let createNewUSer = async (data) => {
            let check = await checkEmailExist(data.email);
            if (check === true) {
                console.log(check);
                return({
                    success:"false",
                    message: 'Email has been used'
                })
            } else {
                // let password = await hashPassword(data.password);
                await db.User.create({
                    email: data.email,
                    last_name: data.last_name,
                    first_name:data.first_name,
                    user_name:data.user_name,
                    password: data.password,
                    phone: data.phone,
                    birthday: data.birthday,
                })
                return({
                    success:"true",
                    message: "Successfully created"
                });
            }
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userToDelete = await db.User.findOne({
                where: { user_id: id }
            })

            if (userToDelete) {
                await db.User.destroy({
                    where: { user_id: id }
                })
                resolve({
                    success:"true",
                    message: "Successfully deleted"
                })
            } else {
                resolve({
                    success:"true",
                    message: "User not exist"
                })
            }
        } catch (error) {
            reject({
                success:"false",
                message:"Error occured"
            });
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
    handleLogin:handleLogin
}