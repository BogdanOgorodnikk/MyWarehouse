const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

const index = require('../index.js')

describe("/GET /api/warehouses", () => {
    it("Checks a succsess get data", (done) => {
        chai
            .request('localhost:5000')
            .get(`/api/warehouses`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})

describe("/POST /api/warehouse", () => {
    it("Checks a succsess warehouse", (done) => {
        chai
            .request('localhost:5000')
            .post(`/api/warehouse`)
            .set("Accept", "application/json")
            .send({town: "Shp", region: "Hm", rent: "5000"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object")
                done();
            });
    });
    it("Checks a bad town and region", (done) => {
        chai
            .request('localhost:5000')
            .post(`/api/warehouse`)
            .set("Accept", "application/json")
            .send({town: "", region: "", rent: "5000"})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    })
})

describe("/PUT /api/warehouse/:id", () => {
    it("Checks a good update warehouse", (done) => {
        const warehouse = {
            town: 'Rivne',
            region: 'Rivnenskiy',
            rent: '100'
        }
        chai
            .request('localhost:5000')
            .put(`/api/warehouse/33`)
            .set("Accept", "application/json")
            .send(warehouse)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it("Checks a bad update warehouse", (done) => {
        const warehouse = {
            town: '',
            region: '',
            rent: '100'
        }
        chai
            .request('localhost:5000')
            .put(`/api/warehouse/33`)
            .set("Accept", "application/json")
            .send(warehouse)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
})

describe("/DELETE /api/warehouse/:id", () => {
    it("Checks a bad update warehouse", (done) => {
        chai
            .request('localhost:5000')
            .delete(`/api/warehouse/35`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})