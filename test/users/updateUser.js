const { chai, expect, app, model } = require("../index.js");
const { genSaltSync, hashSync } = require("bcrypt");

let token;
before(async() => {
    await model.registeration.create({
        "user_name": "upUser",
        "name": "upUser",
        "email": "upUser@upUser",
        "password": hashSync("upUser", genSaltSync(10))
    });
    await model.registeration.create({
        "user_name": "upUser2",
        "name": "upUser2",
        "email": "upUser2@upUser2",
        "password": hashSync("upUser2", genSaltSync(10))
    });
    chai.request(app)
        .post('/api/users/login')
        .send({
            "user_name": "upUser",
            "password": "upUser"
        })
        .end((err, res) => {
            if (err) console.log(err);
            token = res.body.token;
        });
});

describe('updateUser', async() => {
    await it('Update User', (done) => {
        chai.request(app)
            .put('/api/users/')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "user_name": "upUser",
                "name": "upAfter",
                "email": "upAfter@upAfter"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 1, results: "Updated successfully" });
                done();
            });
    });
    await it('user_name Undefined', (done) => {
        chai.request(app)
            .put('/api/users/')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "name": "upAfter",
                "email": "upAfter@upAfter"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "Need to input user_name" });
                done();
            });
    });
    await it('No User Record', (done) => {
        chai.request(app)
            .put('/api/users/')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "user_name": "upUserN",
                "name": "upAfter",
                "email": "upAfter@upAfter"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "No user record" });
                done();
            });
    });
    await it('email Duplicate', (done) => {
        chai.request(app)
            .put('/api/users/')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "user_name": "upUser",
                "name": "upAfter",
                "email": "upUser2@upUser2",
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "Someone has registered this email" });
                done();
            });
    });
    await it('Invalid token', (done) => {
        chai.request(app)
            .put('/api/users/')
            .set('Authorization', 'Bearer ' + "invalid token")
            .send({
                "user_name": "upUser",
                "name": "upAfter",
                "email": "upUser3@upUser3",
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "invalid token" });
                done();
            });
    });
    after(async() => {
        await model.registeration.truncate();
    });
});