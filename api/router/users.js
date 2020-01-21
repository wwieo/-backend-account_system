const { createUser } = require("../../backend/controller/users/create_user");
const { updateUser } = require("../../backend/controller/users/update_user");
const { login } = require("../../backend/controller/users/login");
const { getUsers } = require("../../backend/controller/users/get_users");
const { getUserById } = require("../../backend/controller/users/get_user");

const { checktoken } = require("../../backend/controller/auth/token_validation");
const router = require("express").Router();


router.post("/", createUser);
router.post("/login", login)
router.put("/", updateUser);

router.get("/", getUsers);
router.get("/:id", getUserById);

module.exports = router;