import config  from "../config/default";
import {Connection, createConnection} from "typeorm";

let connection: Connection;

export const initConnection = async () => {
    connection = await createConnection({
        type: "mysql",
        url: <string> config.USERS_SERVICE_DB_URL
    });
}

const getConnection = () => connection;