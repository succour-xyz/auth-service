export type RequestBody = { name: string };
export type RequestParams = { userId: string };
export type SignUpBody = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};
export interface LoginType {
  id: number;
  email: string;
  password: string;
  name: string | null;
}
