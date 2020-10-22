const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

describe("/GET /api/products/:id", () => {
    it("Checks a succsess get data", (done) => {
        chai
            .request('localhost:5000')
            .get(`/api/products/16`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array")
                done();
            });
    });
})

describe("/POST /api/product/:id", () => {

    it("Checks a wrong product", (done) => {
        const product = {
            title: "", 
            characteristic: "", 
            count: "", 
            price: ""
        }
        chai
            .request('localhost:5000')
            .post(`/api/product/16`)
            .set("Accept", "application/json")
            .send(product)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it("Checks a wrong warehouse", (done) => {
        const product = {
            title: "aa", 
            characteristic: "aa", 
            count: "1", 
            price: "1"
        }
        chai
            .request('localhost:5000')
            .post(`/api/product/161`)
            .set("Accept", "application/json")
            .send(product)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
})

describe("/PUT /api/product/:id", () => {

    it("Checks a wrong update product", (done) => {
        const product = {
            title: "", 
            characteristic: "", 
            count: "", 
            price: ""
        }
        chai
            .request('localhost:5000')
            .put(`/api/product/16`)
            .set("Accept", "application/json")
            .send(product)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
})
