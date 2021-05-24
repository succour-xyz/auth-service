/*
 * Copyright (c) 2021.  Piyush Mehta for Succour.xyz
 */

const cache: { [key: string]: string } = {};
/**
 * Access Environment Helper
 * @param key
 * @param defaultValue
 */
const accessEnv = (key: string, defaultValue: string) => {
  if (!(key in process.env) || typeof process.env[key] === undefined) {
    if (defaultValue) return defaultValue;
    throw new Error(`${key} not found in process.env!`);
  }

  if (!(key in cache)) {
    cache[key] = <string>process.env[key];
  }

  return cache[key];
};

export default accessEnv;
