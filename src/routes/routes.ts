import { AUTH, LOGIN, LOGOUT, POST, SIGN_UP } from "../constants/routes";
import Auth from "../controller/implmentations/authImpl";

export const Routes = [
  {
    method: POST,
    route: AUTH + SIGN_UP,
    controller: Auth,
    action: "signUp",
  },
  {
    method: POST,
    route: AUTH + LOGIN,
    controller: Auth,
    action: "login",
  },
  {
    method: POST,
    route: AUTH + LOGOUT,
    controller: Auth,
    action: "logout",
  },
  {
    method: POST,
    route: AUTH + "/test",
    controller: Auth,
    action: "reset",
  },
];
