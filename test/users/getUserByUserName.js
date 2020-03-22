const { chai, expect, app, model } = require("../index.js");

before(async() => {
    await model.registeration.create({
        "user_name": "guByUN",
        "name": "guByUN",
        "email": "guByUN@guByUN",
        "password": "guByUN"
    });
});

describe('getUserByUserName', async() => {
    await it('No User Record', (done) => {
        chai.request(app)
            .get('/api/users/unknown')
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 0, results: "No user record" });
                done();
            })
    });
    await it('Get User', (done) => {
        chai.request(app)
            .get('/api/users/guByUN')
            .end((err, res) => {
                if (err) console.log(err);
                const id = res.body.results.id;
                expect(res.body).to.deep.equal({
                    success: 1,
                    results: {
                        "id": id,
                        "user_name": "guByUN",
                        "name": "guByUN",
                        "email": "guByUN@guByUN",
                    }
                });
                done();
            })
    });
    after(async() => {
        await model.registeration.destroy({ truncate: { cascade: true } });
    });
});