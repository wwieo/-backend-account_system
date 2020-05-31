const { chai, expect, app, model } = require("../index.js");

before(async() => {
    await model.registeration.create({
        "user_name": "user01",
        "name": "user01",
        "email": "user01@user01",
        "password": "user01"
    });
    await model.registeration.create({
        "user_name": "user02",
        "name": "user02",
        "email": "user02@user02",
        "password": "user02"
    });
    await model.registeration.create({
        "user_name": "user03",
        "name": "user03",
        "email": "user03@user03",
        "password": "user03"
    });

    await model.user_relationship.create({
        "sender_id": 1,
        "receiver_id": 1,
        "status": "friend"
    });
    await model.user_relationship.create({
        "sender_id": 1,
        "receiver_id": 3,
        "status": "block"
    });
});

/*
describe('getUserFriends', async() => {
    await it('Get User Friends', (done) => {
        chai.request(app)
            .get('/api/users/userFriends')
            .send({
                "user_id": 1
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({
                    success: 1,
                    results: "No user record"
                });
                done();
            })
    });

    after(async() => {
        await model.query('SET FOREIGN_KEY_CHECKS = 0')
        await model.query('truncate table registeration')
        await model.query('SET FOREIGN_KEY_CHECKS = 1')
    });
}); */