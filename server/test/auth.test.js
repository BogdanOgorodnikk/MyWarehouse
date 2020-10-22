const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

describe("/POST /api/login", () => {
    it("Checks a success auth", (done) => {
        chai
            .request('localhost:5000')
            .post(`/api/login`)
            .set("Accept", "application/json")
            .send({email: "test@mail.ru", password: "123456"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})

// describe("/GET /api/orders", () => {
//     it("Checks a success auth", (done) => {
//         chai
//             .request('localhost:5000')
//             .get(`/api/orders`)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 done();
//             });
//     });
// })