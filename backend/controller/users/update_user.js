const { updateUser } = require("../../database/users");

module.exports = {
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Updated failed"
                });
            }
            return res.json({
                success: 1,
                message: "Updated successfully"
            });
        });
    }
}