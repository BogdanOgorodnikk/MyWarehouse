const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

const index = require('../index.js')

describe("/GET /api/allusers", () => {
    it("Checks a succsess get data", (done) => {
        chai
            .request('localhost:5000')
            .get(`/api/allusers`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})

describe("/PUT /api/useredit/:id", () => {
    it("Checks a good update user", (done) => {
        const user = {
            email: "superpssmssa@mail.ru", 
            password: "123456", 
            name: "Ola", 
            phone: "228"
        }
        chai
            .request('localhost:5000')
            .put(`/api/useredit/5`)
            .set("Accept", "application/json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
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

describe("/PUT /api/allusers/:id", () => {
    it("Checks a good update user", (done) => {
        const user = {
            isAdmin: true,
            allow: false,
            ban: false
        }
        chai
            .request('localhost:5000')
            .put(`/api/allusers/6`)
            .set("Accept", "application/json")
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})