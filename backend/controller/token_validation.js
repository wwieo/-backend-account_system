const { verify } = require("jsonwebtoken")
const { return_rt } = require("./../controller/return_rt")

module.exports = {
    checktoken: (req) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            return verify(token, "qwe1234", (err, decoded) => {
                if (err)
                    return "Access denied, unauthorize user";
                else
                    return decoded["result"].user_name;
            })
        } else
            return "Access denied, unauthorize user";
    }
}