import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./../entity/User";

export const connectDb = createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "test",
  entities: [User],
  synchronize: true,
  logging: true,
})
  .then(async (connection) => {
    // here you can start to work with your entities
    console.log("DB CONNECTED", connection);
  })
  .catch((error) => console.log(error));
