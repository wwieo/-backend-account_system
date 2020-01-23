const {
    createUser,
    updateUser,
    getUsers,
    getUserById,
    login
} = require("../../backend/controller/users");

const { checktoken } = require("../../backend/controller/token_validation");
const router = require("express").Router();


router.post("/", createUser);
router.post("/login", login)
router.put("/", checktoken, updateUser);

router.get("/", getUsers);
router.get("/:id", getUserById);

module.exports = router;