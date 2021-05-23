import UsersService from "../../../adapters/UsersService";
import { ResolverContext } from "../../types";

interface Args {
  me: boolean;
}

/**
 * Delete userSession resolver
 * @param obj
 * @param args
 * @param context
 */
const deleteUserSessionResolver = async (
  obj: any,
  args: Args,
  context: ResolverContext
) => {
  if (args.me !== true) throw new Error("Unsupported argument value");

  const sessionId = context.res.locals.userSession.id;

  await UsersService.deleteUserSession({ sessionId });

  context.res.clearCookie("userSessionId");

  return true;
};

export default deleteUserSessionResolver;
