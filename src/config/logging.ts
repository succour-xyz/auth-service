/**
 * Logs Info level
 * @param namespace
 * @param message
 * @param object???
 */
const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.info(
      `[${getTimeStamp()}] [INFO] [${namespace}] ${message}`,
      object,
    );
  } else {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
  }
};

/**
 * Logs Warning level
 * @param namespace
 * @param message
 * @param object
 */
const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(
      `[${getTimeStamp()}] [WARN] [${namespace}] ${message}`,
      object,
    );
  } else {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
  }
};

/**
 * Logs Error level
 * @param namespace
 * @param message
 * @param object?
 */
const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(
      `[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`,
      object,
    );
  } else {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
  }
};
/**
 * Logs Debug level
 * @param namespace
 * @param message
 * @param object
 */
const debug = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.debug(
      `[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
      object,
    );
  } else {
    console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
  }
};

const getTimeStamp = (): string => {
  return new Date().toISOString();
};

export default {
  info,
  warn,
  error,
  debug,
};
