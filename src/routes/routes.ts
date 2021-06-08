import { ADMIN, AUTH, GET_ALL, LOGIN, SIGN_UP } from "../constants/routes";
import Admin from "../controller/implmentations/adminImpl";
import Router from "express";
import Auth from "../controller/implmentations/authImpl";
const router = Router();

/**
 * Admin Routes
 */
export const AdminRoutes = router.get(ADMIN + GET_ALL, Admin.allUsers);
/**
 * Auth Routes
 */
export const AuthRoutes = [
  router.all(AUTH + LOGIN, Auth.login),
  router.post(AUTH + SIGN_UP, Auth.signUp),
];
