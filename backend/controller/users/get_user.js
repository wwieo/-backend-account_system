const { getUserById } = require("../../database/users");

module.exports = {
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "No user record"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        })
    }
}