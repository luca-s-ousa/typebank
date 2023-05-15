import { Date } from "mongoose";

export type User = {
  name: string;
  cpf: string;
  date_of_birth: Date;
  phone: string;
  username: string;
  password: string;
};

export type VerifyUser = {
  username: string;
};
