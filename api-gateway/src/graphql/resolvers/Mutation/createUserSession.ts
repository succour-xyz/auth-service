import UsersService from "../../../adapters/UsersService";
import { ResolverContext } from "../../types";

interface Args {
  password: string;
  username: string;
}

/**
 * Create user session resolver
 * @param obj
 * @param password
 * @param username
 * @param context
 */
const createUserSessionResolver = async (
  obj: any,
  { password, username }: Args,
  context: ResolverContext
) => {
  const userSession = await UsersService.createUserSession({
    password,
    username,
  });

  context.res.cookie("userSessionId", userSession.id, { httpOnly: true });

  return userSession;
};

export default createUserSessionResolver;
