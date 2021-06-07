// import prismaMock from "../../src/util/db";
import {
  MockContext,
  Context,
  createMockContext,
} from "../../src/util/context";

process.env.NODE_ENV = "test";
// import sinon from "sinon";
// import AuthImpl from "../../src/controller/implmentations/authImpl";
// import { Request, Response } from "express";
import { expect } from "chai";
// import { Done } from "mocha";
// @ts-ignore
import { createUser } from "./authFunctions.test";

// const Authimpl = new AuthImpl();

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});
describe("Auth Controller - Signup", () => {
  it("should not login because not Invalid Details", async () => {
    const user = {
      id: 1,
      email: "test@result.com",
      password: "tester",
      confirmPassword: "tester",
      name: "Test",
    };
    //
    // const req = { body: user };
    // const res = {};
    // sinon.stub(prismaMock.user, "create");
    mockCtx.prisma.user.create.mockResolvedValue(user);
    await expect(createUser(user, ctx.prisma)).to.be.eql({
      id: 1,
      email: "test@result.com",
      password: "tester",
      confirmPassword: "tester",
      name: "Test",
    });
  });

  //
  // Authimpl.signUp(<Request>req, <Response>res)
  //
  //     .then((result) => {
  //       expect(result).to.an("undefined");
  //       done();
  //     })
  //     .catch((error) => {
  //       expect(error).to.an("error");
  //       console.error(error);
  //       done();
  //     });
  // });
});
// describe("Auth Controller - Login", () => {
//   it("should not login because not signed Up", (done: Done) => {
//     prisma.user.findUnique;
//     sinon.stub(prisma.user, "findUnique");
//     const req = {
//       body: { email: "test@mail.com", password: "tester" },
//     };
//     const res = {};
//     Authimpl.login(<Request>req, <Response>res)
//       .then(() => {})
//       .catch((error) => {
//         console.error(error);
//       });
//     done();
//   });
// });
