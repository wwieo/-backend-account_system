const { chai, expect, app, model } = require("../index.js");
const { genSaltSync, hashSync } = require("bcrypt");

before(async() => {
    await model.registeration.create({
        "user_name": "lgUser",
        "name": "lgUser",
        "email": "lgUser@lgUser",
        "password": hashSync("lgUser", genSaltSync(10))
    });
});

describe('login', async() => {
    await it('Login By user_name', (done) => {
        chai.request(app)
            .post('/api/users/login')
            .send({
                "user_name": "lgUser",
                "password": "lgUser"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.success).to.equal(1);
                done();
            })
    });
    await it('Login By email', (done) => {
        chai.request(app)
            .post('/api/users/login')
            .send({
                "email": "lgUser@lgUser",
                "password": "lgUser"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.success).to.equal(1);
                done();
            })
    });
    await it('No User Record', (done) => {
        chai.request(app)
            .post('/api/users/login')
            .send({
                "user_name": "none",
                "password": "lgUser"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "user_name and email are none or no user record" });
                done();
            })
    });
    await it('Password Undefined', (done) => {
        chai.request(app)
            .post('/api/users/login')
            .send({
                "user_name": "lgUser",
                "password": ""
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "Password input is none" });
                done();
            })
    });
    await it('Invalid Password', (done) => {
        chai.request(app)
            .post('/api/users/login')
            .send({
                "user_name": "lgUser",
                "password": "none"
            })
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "invalid password" });
                done();
            })
    });
    after(async() => {
        await model.registeration.destroy({ truncate: { cascade: true } });
    });
})