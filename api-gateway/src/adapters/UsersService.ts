import got from "got";
import config from "../config/default";

export default class UsersService {
  static async fetchUserSession({ sessionId }: { sessionId: string }) {
    const body = await got.get(
      `${config.USERS_SERVICE_URI}/sessions/${sessionId}`
    );

    return body;
  }
}
