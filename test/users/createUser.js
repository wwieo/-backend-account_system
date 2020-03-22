const { chai, expect, app, model } = require("../index.js");

before(async() => {
    await model.registeration.create({
        "user_name": "crUser",
        "name": "crUser",
        "email": "crUser@crUser",
        "password": "crUser"
    });
});

describe('createUser', async() => {
    await it('Create User', (done) => {
        chai.request(app)
            .post('/api/users')
            .send({
                "user_name": "crUserC",
                "name": "crUserC",
                "email": "crUserC@crUserC",
                "password": "crUserC"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({
                    success: 1,
                    results: {
                        "user_name": "crUserC",
                        "name": "crUserC",
                        "email": "crUserC@crUserC",
                    }
                });
                done();
            })
    });
    await it('Undefined Input', (done) => {
        chai.request(app)
            .post('/api/users')
            .send({
                "user_name": "crUserU",
                "name": "crUserU",
                "email": "crUserU@crUserU"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "some inputs are none" });
                done();
            })
    });
    await it('Check Input Length', (done) => {
        chai.request(app)
            .post('/api/users')
            .send({
                "user_name": "crUserLcrUserL",
                "name": "crUserL",
                "email": "crUserL@crUserL",
                "password": "crUserL"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "user_name's length need be less than 12" });
                done();
            })
    });
    await it('user_name Duplicate', (done) => {
        chai.request(app)
            .post('/api/users')
            .send({
                "user_name": "crUser",
                "name": "crUserD",
                "email": "crUserD@crUserD",
                "password": "crUserD"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "someone has registered this user_name" });
                done();
            })
    });
    await it('email Duplicate', (done) => {
        chai.request(app)
            .post('/api/users')
            .send({
                "user_name": "crUserD",
                "name": "crUserD",
                "email": "crUser@crUser",
                "password": "crUserD"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "someone has registered this email" });
                done();
            })
    });
    after(async() => {
        await model.registeration.destroy({ truncate: { cascade: true } });
    });
});