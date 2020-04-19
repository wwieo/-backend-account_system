const {
    getUserFriends,
    checkRelationship,
    exactCheckRelationship,
    friendRequest,
    replyFriend,
    unfriend,
    createBlockUser,
    updateBlockUser,
    unBlock
} = require("../database/user_relationship");
const {
    getUserById
} = require("../database/users");
const { return_rt } = require("./../controller/return_rt")

module.exports = {
    getUserFriends: async function(req, res) {
        const body = req.body;

        if (body.user_id == undefined)
            return return_rt(res, 0, "some inputs are none");

        const user = await getUserById(body.user_id);
        if (!user) return return_rt(res, 0, "user is not exist");

        await getUserFriends(body)
            .then((results) => {
                return return_rt(res, 1, results);
            })
            .catch((results) => {
                console.log(results);
                return return_rt(res, 0, "Database connection error");
            });
    },
    checkRelationship: async function(req, res) {
        const body = req.body;

        if (body.user1_id == undefined || body.user2_id == undefined)
            return return_rt(res, 0, "some inputs are none");

        const user1 = await getUserById(body.user1_id);
        const user2 = await getUserById(body.user2_id);
        if (!user1) return return_rt(res, 0, "user_id " + body.user1_id + " is not exist");
        if (!user2) return return_rt(res, 0, "user_id " + body.user2_id + " is not exist");

        await checkRelationship(body)
            .then((results) => {
                return return_rt(res, 1, results);
            })
            .catch((results) => {
                console.log(results);
                return return_rt(res, 0, "Database connection error");
            });
    },
    friendRequest: async function(req, res) {
        const body = req.body;
        if (body.sender_id == undefined || body.receiver_id == undefined)
            return return_rt(res, 0, "some inputs are none");

        const user1 = await getUserById(body.sender_id);
        const user2 = await getUserById(body.receiver_id);
        if (!user1) return return_rt(res, 0, "user_id " + body.sender_id + " is not exist");
        if (!user2) return return_rt(res, 0, "user_id " + body.receiver_id + " is not exist");

        const request = await exactCheckRelationship(body);

        try {
            if (request.status == "friend") {
                return_rt(res, 0, "they're already friend");
            } else if (request.status == "block") {
                return_rt(res, 0, "receiver has been blocked by sender");
            } else if (request.status == "unchecked_friend") {
                return_rt(res, 0, "sender has been sent the request");
            } else {
                return_rt(res, 0, "unknown status");
            }
        } catch {
            await friendRequest(body)
                .then((body) => {
                    return return_rt(res, 1, {
                        "sender_id": body.sender_id,
                        "receiver_id": body.receiver_id,
                        "status": body.status
                    });
                })
                .catch((body) => {
                    console.log(body);
                    return return_rt(res, 0, "Database connection error");
                });
        }

    },
    replyFriend: async function(req, res) {
        const body = req.body;
        if (body.sender_id == undefined || body.receiver_id == undefined)
            return return_rt(res, 0, "some inputs are none");

        const user1 = await getUserById(body.sender_id);
        const user2 = await getUserById(body.receiver_id);
        if (!user1) return return_rt(res, 0, "user_id " + body.sender_id + " is not exist");
        if (!user2) return return_rt(res, 0, "user_id " + body.receiver_id + " is not exist");

        const request = await exactCheckRelationship(body);
        if (!request) return return_rt(res, 0, "sender didn't send the request");

        const status = request.status;
        if (status == "unchecked_friend") {
            await replyFriend(body)
                .then((body) => {
                    return return_rt(res, 1, {
                        "sender_id": body.sender_id,
                        "receiver_id": body.receiver_id,
                        "status": "friend"
                    });
                })
                .catch((body) => {
                    console.log(body);
                    return return_rt(res, 0, "Database connection error");
                });
        } else {
            return return_rt(res, 0, "status need to be unchecked_friend");
        }
    },
    unfriend: async function(req, res) {
        const body = req.body;

        if (body.user1_id == undefined || body.user2_id == undefined)
            return return_rt(res, 0, "some inputs are none");

        const user1 = await getUserById(body.user1_id);
        const user2 = await getUserById(body.user2_id);
        if (!user1) return return_rt(res, 0, "user_id " + body.user1_id + " is not exist");
        if (!user2) return return_rt(res, 0, "user_id " + body.user2_id + " is not exist");

        const request = await checkRelationship(body);
        if (!request) return return_rt(res, 0, "they don't have relationship");

        const status = request.status;
        if (status != "friend") return return_rt(res, 0, "their relationship is not friend");
        else {
            await unfriend(body)
                .then((results) => {
                    return return_rt(res, 1, "unfriend success");
                })
                .catch((results) => {
                    console.log(results);
                    return return_rt(res, 0, "Database connection error");
                });
        }
    },
    blockUser: async function(req, res) {
        const body = req.body;

        if (body.sender_id == undefined || body.receiver_id == undefined)
            return return_rt(res, 0, "some inputs are none");

        const user1 = await getUserById(body.sender_id);
        const user2 = await getUserById(body.receiver_id);
        if (!user1) return return_rt(res, 0, "user_id " + body.sender_id + " is not exist");
        if (!user2) return return_rt(res, 0, "user_id " + body.receiver_id + " is not exist");

        body.user1_id = body.sender_id;
        body.user2_id = body.receiver_id;

        const hasRelationship = await checkRelationship(body);
        if (hasRelationship) {
            if (hasRelationship.status == "block") return return_rt(res, 0, "has been already blocked");
            else {
                await updateBlockUser(body)
                    .then((results) => {
                        return return_rt(res, 1, "block success");
                    })
                    .catch((results) => {
                        console.log(results);
                        return return_rt(res, 0, "Database connection error");
                    });
            }
        } else {
            await createBlockUser(body)
                .then((results) => {
                    return return_rt(res, 1, "block success");
                })
                .catch((results) => {
                    console.log(results);
                    return return_rt(res, 0, "Database connection error");
                });
        }
    },
    unBlock: async function(req, res) {
        const body = req.body;

        if (body.sender_id == undefined || body.receiver_id == undefined)
            return return_rt(res, 0, "some inputs are none");

        const user1 = await getUserById(body.sender_id);
        const user2 = await getUserById(body.receiver_id);
        if (!user1) return return_rt(res, 0, "user_id " + body.sender_id + " is not exist");
        if (!user2) return return_rt(res, 0, "user_id " + body.receiver_id + " is not exist");

        const request = await exactCheckRelationship(body);
        if (!request) return return_rt(res, 0, "they don't have relationship or sender and receiver is opposite");

        if (request.status == "block") {
            await unBlock(body)
                .then((results) => {
                    return return_rt(res, 1, "unblock success");
                })
                .catch((results) => {
                    console.log(results);
                    return return_rt(res, 0, "Database connection error");
                });
        } else return return_rt(res, 0, "status is not block");
    }
}