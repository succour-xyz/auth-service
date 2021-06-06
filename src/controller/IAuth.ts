import { Request, Response } from "express";

export default interface IAuth {
  /**
   * Sign Up
   * @param req
   * @param res
   */
  signUp(req: Request, res: Response): Promise<unknown>;

  /**
   * Login
   * @param req
   * @param res
   */
  login(req: Request, res: Response): Promise<unknown>;

  /**
   * Logout
   * @param req
   * @param res
   */
  logout(req: Request, res: Response): void;

  /**
   * Reset
   * @param req
   * @param res
   */
  reset?(req: Request, res: Response): void;
}
