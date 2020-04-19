const { chai, expect, app, model } = require("../index.js");


describe('getUsers', async() => {
    await it('Get Users', (done) => {
        chai.request(app)
            .get('/api/users')
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body.success).to.equal(1);
                done();
            })
    });
    after(async() => {
        await model.query('SET FOREIGN_KEY_CHECKS = 0')
        await model.query('truncate table registeration')
        await model.query('SET FOREIGN_KEY_CHECKS = 1')
    });
});