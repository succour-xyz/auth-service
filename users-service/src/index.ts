/*
 * Copyright (c) 2021.  Piyush Mehta for Succour.xyz
 */

import { initConnection } from "./db/index";
import startServer from "./server/startServer";

initConnection().then(() => {
  startServer();
});
