import { initConnection } from "./db/index";
import startServer from "./server/startServer";

initConnection().then(() => {
  startServer();
});
