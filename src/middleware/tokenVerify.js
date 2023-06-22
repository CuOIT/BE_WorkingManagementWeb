const { verify } = require("jsonwebtoken");
const token = require("../Utils/token");

module.exports = tokenVerify = (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
        return res.sendStatus(401);
    }
    const accessToken = authorizationHeader?.split(" ")[1];
    if (!accessToken) {
        return res.sendStatus(401);
    }
    token
        .verifyAccessToken(accessToken)
        .then((data) => {
            console.log({ data });
            req.body = { user_id: data.user_id, ...req.body };
            console.log(req.body);
            next();
        })
        .catch((error) => {
            return res.sendStatus(401);
        });
};
