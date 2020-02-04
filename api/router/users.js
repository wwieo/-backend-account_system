const {
    createUser,
    updateUser,
    getUsers,
    getUserByUserName,
    login
} = require("../../backend/controller/users");

const { checktoken } = require("../../backend/controller/token_validation");
const router = require("express").Router();

router.get("/", getUsers);
router.get("/:user_name", getUserByUserName);

router.post("/", createUser);
router.post("/login", login)

router.put("/", checktoken, updateUser);



module.exports = router;