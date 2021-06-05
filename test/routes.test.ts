import Users from "../src/controller/users";

process.env.NODE_ENV = "test";

import chai from "chai";
import server from "../src/index";
import chaiHttp from "chai-http";
import sinon from "sinon";

chai.use(chaiHttp);
chai.should();

describe("Health Check Route", () => {
  it("It should return 200 status", (done) => {
    chai
      .request(server)
      .get("/healthCheck")
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("User Routes", () => {
  it("It should get all the users, Currently Empty", (done) => {
    before(() => {
      sinon.stub(Users, "getAllUsers").yields(JSON.stringify([]));
    });
    // const spy = sinon.spy(Users, "getAllUsers");
    // stub()
    //   .yields(null, mockUsers)
    //   .chai.request(server)
    //   .get("/admin/user")
    //   .end((_err, res) => {
    //     res.should.have.status(404);
    //     res.body.should.be.eql({});
    done();
  });
});

describe("Auth Routes", () => {
  const user = {
    name: "Piyush",
    email: "test@case.com",
    password: "helloo",
    confirmPassword: "helloo",
  };
  it("It login if user exists", (done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send(user)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({});
        done();
      });
  });
});
