import { User } from "../../src/entity/User";
import AuthController from "../../src/controller/implmentations/authImpl";
import Sinon from "sinon";
import {
  createConnection,
  createConnections,
  getConnectionManager,
  getRepository,
} from "typeorm";
import { Request, Response } from "express";
import jest from "jest";
import "babel-polyfill";
import expect from "jest";

describe("Auth Controller - Login", () => {
  // it("should return a data from db", async () => {
  //   const user = { name: "Piyush", email: "test@user.com", password: "helloo" };
  //   const getOne = Sinon.stub().resolves(user);
  //   const where = Sinon.stub().callsArg(0);
  //   const createQueryBuilder = Sinon.stub().callsArg(0);
  //   const connection = {
  //     getRepository: Sinon.stub(),
  //   };
  //
  //   connection.getRepository.withArgs("he").returns({ createQueryBuilder });
  //   createQueryBuilder.withArgs(User).returns({ where });
  //   where
  //     .withArgs("user.email = :email", { email: user.email })
  //     .returns({ getOne });
  //   // bla bla
  // });
  it("should throw an Error if accessing db fails", async (done) => {
    await createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password",
      database: "test1",
      synchronize: true,
      logging: false,
      entities: [User],
    }).then(async (Connection) => {
      // const userRepo = Connection.getRepository(User);
      // const email = "test@user.com";
      // // await userRepo.find({ email }).then((result) => console.log(result));
      // // await userRepo.delete({ email }).then((result) => console.log(result));
      const auth = new AuthController();

      const res = {
        statusCode: 500,
        userStatus: null,
        status: function (code: number) {
          this.statusCode = code;
          return this;
        },

        json: function (data: { status: null }) {
          this.userStatus = data.status;
        },
      };

      const user = new User(
        1,
        "Piyush Mehta",
        "test@user.com",
        "password",
        new Date()
      );

      const req = {
        body: { email: user.email, id: user.id, password: user.password, user },
      };
      await auth
        .login(<Request>req, <Response>(<unknown>res))
        .then(async (result) => await console.log(result));

      await Connection.close();
    });
  });
});
