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
let handleLogin = (phone, password) => {
    return new Promise(async (resolve, reject) => {
        let data = {};
        let checkUserExist = await checkUserPhone(phone);
        if (checkUserExist) {
            let user = await db.User.findOne({
                where: {
                    phone: phone,
                }, raw: true
            });
            if (user) {
                // let checkPassword = bcrypt.compareSync(password, user.password);
                let checkPassword = password === user.password;
                if (checkPassword) {
                    data.code = 0;
                    data.message = 'OK';
                    delete user.password;
                    data.user = user;
                } else {
                    data.code = 3;
                    data.message = 'Wrong password';
                }
            } else {
                data.code = 2;
                data.message = 'Your account does not exist'
            }
        } else {
            data.code = 2;
            data.message = 'Your account does not exist'
        }

        resolve(data);
    })
}
let checkUserPhone = (phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    phone: phone
                }, raw: true
            })

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}
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
                    message: "Missing required parameters: password"
                })
            }

            let check = await checkEmailExist(data.email);
            if (check == true) {
                resolve({
                    code: 1,
                    message: 'Email has been used'
                })
            } else {
                // let password = await hashPassword(data.password);
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
    handleLogin:handleLogin
}