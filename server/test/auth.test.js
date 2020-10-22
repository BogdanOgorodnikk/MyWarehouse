const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

describe("/POST /api/login", () => {
    it("Checks a succsess login", (done) => {
        chai
            .request('localhost:5000')
            .post(`/api/login`)
            .set("Accept", "application/json")
            .send({email: "test@mail.ru", password: "123456"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object")
                res.body.should.have.property('user')
                res.body.should.have.property('token')
                done();
            });
    });
    it("Checks a wrong email", (done) => {
        chai
            .request('localhost:5000')
            .post(`/api/login`)
            .set("Accept", "application/json")
            .send({email: "test", password: "123456"})
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
    it("Checks a wrong password", (done) => {
        chai
            .request('localhost:5000')
            .post(`/api/login`)
            .set("Accept", "application/json")
            .send({email: "test@mail.ru", password: "123"})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it("Checks a wrong email & pass", (done) => {
        chai
            .request('localhost:5000')
            .post(`/api/login`)
            .set("Accept", "application/json")
            .send({email: "test@.ru", password: "123"})
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
})
