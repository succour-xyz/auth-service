import UsersService from "../../../adapters/UsersService";

interface Args {
  password: string;
  username: string;
}

const createUserResolver = async (obj: any, { password, username }: Args) => {
  return await UsersService.createUser({ password, username });
};

export default createUserResolver;
