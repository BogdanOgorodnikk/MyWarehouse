const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

describe("/GET /api/orders", () => {
    it("Checks a succsess orders data", (done) => {
        chai
            .request('localhost:5000')
            .get(`/api/orders`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object")
                done();
            });
    });
})

describe("/GET /api/orders/:id", () => {
    it("Checks a succsess orders data by id", (done) => {
        chai
            .request('localhost:5000')
            .get(`/api/orders/99`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object")
                done();
            });
    });
})
