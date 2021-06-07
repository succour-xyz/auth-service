import { AUTH, LOGIN, LOGOUT, SIGN_UP } from "../constants/routes";
import Auth from "../controller/implmentations/authImpl";

export const Routes = [
  {
    method: "post",
    route: AUTH + SIGN_UP,
    controller: Auth,
    action: "signUp",
  },
  {
    method: "post",
    route: AUTH + LOGIN,
    controller: Auth,
    action: "login",
  },
  {
    method: "post",
    route: AUTH + LOGOUT,
    controller: Auth,
    action: "logout",
  },
];
