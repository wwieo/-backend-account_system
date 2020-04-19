const {
    getUserFriends,
    checkRelationship,
    friendRequest,
    replyFriend,
    unfriend,
    blockUser,
    unBlock
} = require("../../backend/controller/user_relationship");

const { checktoken } = require("../../backend/controller/token_validation");
const router = require("express").Router();

router.get("/userFriends", getUserFriends);
router.get("/check", checkRelationship);

router.post("/friendRequest", friendRequest);

router.put("/replyFriend", replyFriend);
router.put("/block", blockUser);

router.delete("/unfriend", unfriend);
router.delete("/unblock", unBlock);

module.exports = router;