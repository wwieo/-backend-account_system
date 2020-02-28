const {
    checkRelationship,
    exactCheckRelationship,
    friendRequest,
    replyFriend
} = require("../database/user_relationship");
const {
    getUserById
} = require("../database/users");
const { return_rt } = require("./../controller/return_rt")

//friend
//unfriend
//unchecked_friend
//block

module.exports = {
    checkRelationship: async function(req, res) {
        const body = req.body;

        if (body.user1_id == undefined || body.user2_id == undefined)
            return return_rt(res, 0, "some inputs are none");

        if (!checkUserExist(res, body.user1_id)) return checkUserExist(body.user1_id);
        if (!checkUserExist(res, body.user2_id)) return checkUserExist(body.user2_id);

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

        if (!checkUserExist(res, body.sender_id)) return checkUserExist(body.sender_id);
        if (!checkUserExist(res, body.receiver_id)) return checkUserExist(body.receiver_id);

        const request = await exactCheckRelationship(body);

        if (request.status == "friend") {
            return_rt(res, 0, "they're already friend");
        } else if (request.status == "block") {
            return_rt(res, 0, "receiver has been blocked by sender");
        } else if (request.status == "unchecked_friend") {
            return_rt(res, 0, "sender has been sent the request");
        } else {
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

        if (!checkUserExist(res, body.sender_id)) return checkUserExist(body.sender_id);
        if (!checkUserExist(res, body.receiver_id)) return checkUserExist(body.receiver_id);

        const request = await exactCheckRelationship(body);
        if (!request) return return_rt(res, 0, "sender didn't send the request");

        const status = request.status;
        if (status == "unchecked_friend") {
            await replyFriend(body)
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
        } else {
            return return_rt(res, 0, "status need to be unchecked_friend");
        }
    }
}

async function checkUserExist(res, user_id) {
    const user = await getUserById(user_id);
    if (!user) return return_rt(res, 0, "user_id " + user_id + " is not exist");
    return 0;
}