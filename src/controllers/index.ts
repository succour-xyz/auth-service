import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Query, Connect } from '../config/mysql';
import INDEX_NAMESPACE from '../constants';

const NAMESPACE: { INDEX_NAMESPACE: string } = INDEX_NAMESPACE;

const serverHealthCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logging.info(NAMESPACE, 'API WORKING FINE.');
  const query = `select * from test`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result: any) => {
          logging.info(NAMESPACE, 'API WORKING FINE.', result);
          return res.status(200).json({
            res: 'Working Normally',
          });
        })
        .catch((error: { message: string }) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(200).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          logging.info(NAMESPACE, 'Closing connection.');
          connection.end();
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error,
      });
    });
};
export default { serverHealthCheck };
