/*
 * Copyright (c) 2021.  Piyush Mehta for Succour.xyz
 */

import bcrypt from "bcryptjs";

const passwordCompareSync = (passwordToTest: string, passwordHash: string) =>
  bcrypt.compareSync(passwordToTest, passwordHash);

export default passwordCompareSync;
