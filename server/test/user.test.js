const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

describe("/PUT /api/useredit/:id", () => {
    it("Checks a wrong update user", (done) => {
        const user = {
            email: "skk@mail.ru", 
            password: "123456", 
            name: "Ola", 
            phone: "228"
        }
        chai
            .request('localhost:5000')
            .put(`/api/useredit/20`)
            .set("Accept", "application/json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it("Checks a wrong update user data", (done) => {
        const user = {
            email: "sk@mail.ru", 
            password: "", 
            name: "Ola", 
            phone: "228"
        }
        chai
            .request('localhost:5000')
            .put(`/api/useredit/20`)
            .set("Accept", "application/json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
})