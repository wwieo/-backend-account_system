const { getUsers } = require("../../database/users");

module.exports = {
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: "Something gets error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: results
            });
        });
    }
}