const jwt = require("jsonwebtoken");

const generateAccessToken = (data) => {
    const token = jwt.sign(data, process.env.SECRET, { expiresIn: "20m" });
    return token;
};
const generateRefreshToken = (data) => {
    const token = jwt.sign(data, process.env.REFRESH, { expiresIn: "30d" });
    return token;
};
const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        console.log({ token });
        jwt.verify(token, process.env.SECRET, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};
const verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH, (err, data) => {
            if (err) reject(err);
            console.log({ data });
            resolve(data);
        });
    });
};

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };
