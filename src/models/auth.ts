import { TUser } from "./user";

export type TLoginArg = {
  phoneNumber: string;
  password: string;
};
export type TLoginRes = {
  accessToken: string;
  currentUser: TUser;
};
export type TRegisterArg = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
};

export type TRegisterRes = {
  accessToken: string;
  newUser: TUser;
};
