const {
    createUser,
    updateUser,
    updateUserPassword,
    getUsers,
    getUserByUserName,
    login
} = require("../../backend/controller/users");

const { checktoken } = require("../../backend/controller/token_validation");
const router = require("express").Router();

router.get("/", getUsers);
router.get("/:user_name", getUserByUserName);

router.post("/", createUser);
router.post("/login", login);

router.put("/", updateUser); //token
router.put("/pw", updateUserPassword); //token

module.exports = router;