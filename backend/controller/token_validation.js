const { verify } = require("jsonwebtoken")
const { return_rt } = require("./../controller/return_rt")

module.exports = {
    checktoken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, "qwe1234", (err, decoded) => {
                if (err)
                    return return_rt(res, 0, "invalid token");
                else
                    next();
            })
        } else
            return return_rt(res, 0, "Access denied, unauthorize user");
    }
}