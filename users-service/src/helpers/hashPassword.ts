/*
 * Copyright (c) 2021.  Piyush Mehta for Succour.xyz
 */

import bcrypt from "bcryptjs";

const hashPassword = (password: string) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export default hashPassword;
