const { chai, expect, app, model } = require("../index.js");
const { genSaltSync, hashSync } = require("bcrypt");

let token;
before(async() => {
    await model.registeration.create({
        "user_name": "upUserPW",
        "name": "upUserPW",
        "email": "upUserPW@upUserPW",
        "password": hashSync("upUserPW", genSaltSync(10))
    });
    await model.registeration.create({
        "user_name": "upUserPW2",
        "name": "upUserPW2",
        "email": "upUser2@upUserPW2",
        "password": hashSync("upUserPW2", genSaltSync(10))
    });
    chai.request(app)
        .post('/api/users/login')
        .send({
            "user_name": "upUserPW",
            "password": "upUserPW"
        })
        .end((err, res) => {
            if (err) console.log(err);
            token = res.body.token;
        });
});

describe('updateUserPassword', async() => {
    await it('Update User Password', (done) => {
        chai.request(app)
            .put('/api/users/pw')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "user_name": "upUserPW",
                "old_password": "upUserPW",
                "new_password": "upUserPWAgo"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 1, results: "Updated password successfully" });
                done();
            });
    });
    await it('Input Undefined', (done) => {
        chai.request(app)
            .put('/api/users/pw')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "old_password": "upUserPW",
                "new_password": "upUserPWAgo"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "Some inputs are none" });
                done();
            });
    });
    await it('Invalid Old Password', (done) => {
        chai.request(app)
            .put('/api/users/pw')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "user_name": "upUserPW",
                "old_password": "upUserPWInvalid",
                "new_password": "upUserPWAgo"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "Old password is different" });
                done();
            });
    });
    await it('Check New Password Length', (done) => {
        chai.request(app)
            .put('/api/users/pw')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "user_name": "upUserPW",
                "old_password": "upUserPW",
                "new_password": "12345"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "new_password's length need be more than 5" });
                done();
            });
    });
    after(async() => {
        await model.registeration.truncate();
    });
});