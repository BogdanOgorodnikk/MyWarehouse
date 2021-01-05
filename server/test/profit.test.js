const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

const index = require('../index.js')

describe("/GET /api/profits", () => {
    it("Checks a succsess get data", (done) => {
        chai
            .request('localhost:5000')
            .get(`/api/profits`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})