import UsersService from "../../../adapters/UsersService";

interface Args {
  password: string;
  username: string;
}

/**
 * create user resolver
 * @param obj
 * @param password
 * @param username
 */
const createUserResolver = async (obj: any, { password, username }: Args) => {
  return await UsersService.createUser({ password, username });
};

export default createUserResolver;
