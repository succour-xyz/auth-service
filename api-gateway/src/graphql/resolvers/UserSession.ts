import UsersService from "../../adapters/UsersService";
import { UserSessionType } from "../../graphql/types";

const UserSession = {
  user: async (userSession: UserSessionType) => {
    return await UsersService.fetchUser({ userId: userSession.userId });
  },
};

export default UserSession;
