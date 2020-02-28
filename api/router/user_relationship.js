const {
    checkRelationship,
    friendRequest,
    replyFriend
} = require("../../backend/controller/user_relationship");

const { checktoken } = require("../../backend/controller/token_validation");
const router = require("express").Router();

router.get("/check", checkRelationship);

router.post("/friendRequest", friendRequest);

router.put("/replyFriend", replyFriend);

module.exports = router;