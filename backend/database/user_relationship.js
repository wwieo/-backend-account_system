const pool = require("../../model/index.js");
const { Op } = require("sequelize");

const checkRelationship = (body) => {
    return new Promise((resolve, reject) => {
        pool.user_relationship.findOne({
                where: {
                    [Op.or]: [{
                            sender_id: body.user1_id,
                            receiver_id: body.user2_id,
                        },
                        {
                            sender_id: body.user2_id,
                            receiver_id: body.user1_id
                        }
                    ]
                }
            })
            .then((result) => {
                return resolve(result);
            }).catch((error) => {
                return reject(error);
            });
    })
}

const exactCheckRelationship = (body) => {
    return new Promise((resolve, reject) => {
        pool.user_relationship.findOne({
                where: {
                    sender_id: body.sender_id,
                    receiver_id: body.receiver_id,
                }
            })
            .then((result) => {
                return resolve(result);
            }).catch((error) => {
                return reject(error);
            });
    })
}

const friendRequest = (body) => {
    return new Promise((resolve, reject) => {
        pool.user_relationship.create({
                sender_id: body.sender_id,
                receiver_id: body.receiver_id,
                status: "unchecked_friend"
            })
            .then((result) => {
                return resolve(result);
            }).catch((error) => {
                return reject(error);
            });
    })
}

const replyFriend = (body) => {
    return new Promise((resolve, reject) => {
        pool.user_relationship.update({
                status: "friend"
            }, {
                where: {
                    sender_id: body.sender_id,
                    receiver_id: body.receiver_id
                }
            })
            .then((result) => {
                return resolve(result);
            }).catch((error) => {
                return reject(error);
            });
    })
}

module.exports = {
    checkRelationship,
    exactCheckRelationship,
    friendRequest,
    replyFriend
}