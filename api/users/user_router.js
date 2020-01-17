const {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    login
} = require("./user_controller");

const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/", updateUser);
router.delete("/:id", deleteUser);

router.post("/login", login)

module.exports = router;