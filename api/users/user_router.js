const {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    login
} = require("./user_controller");

const router = require("express").Router();
const { checktoken } = require("../../auth/token_validation")


router.post("/", checktoken, createUser);
router.get("/", checktoken, getUsers);
router.get("/:id", checktoken, getUserById);
router.put("/", checktoken, updateUser);
router.delete("/:id", checktoken, deleteUser);

router.post("/login", login)

module.exports = router;