import "reflect-metadata";

import { initConnection } from "../db/index";


initConnection().then(() => {
  console.log("DB connection established");
});