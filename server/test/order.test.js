const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

const index = require('../index.js')


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

describe("/POST /api/order/:warehouse/:owner/:product", () => {
    it("Checks a succsess warehouse", (done) => {
        const order = {
            title: 'Канапа', 
            count: 'широка', 
            price: '1000', 
            recipient_city: 'Житомир', 
            data: '2020-10-18'
        }
        chai
            .request('localhost:5000')
            .post(`/api/order/16/5/18`)
            .set("Accept", "application/json")
            .send(order)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it("Checks a wrong warehouse data", (done) => {
        const order = {
            title: 'Канапа', 
            count: '', 
            price: '1000', 
            recipient_city: 'Житомир', 
            data: '2020-10-18'
        }
        chai
            .request('localhost:5000')
            .post(`/api/order/16/5/18`)
            .set("Accept", "application/json")
            .send(order)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
})

describe("/PUT /api/order/:id/:product", () => {
    it("Checks a good update order", (done) => {
        const order = {
            status: 1,
            counts: 5
        }
        chai
            .request('localhost:5000')
            .put(`/api/order/107/18`)
            .set("Accept", "application/json")
            .send(order)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})