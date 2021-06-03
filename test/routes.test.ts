process.env.NODE_ENV = "test";

import chai from "chai";
import server from "../src/index";
import chaiHttp from "chai-http";

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
