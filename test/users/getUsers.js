const chai = require('chai');
const expect = chai.expect;

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require("../../app");

before((done) => {
    done();
})

describe('getUsers', () => {
    it('getUsers', (done) => {
        chai.request(app)
            .get('/api/users')
            .end((err, res) => {
                if (err) console.log(err);
                expect(res.body).to.deep.equal({ success: 1, results: [] });
                done();
            })
    })
})