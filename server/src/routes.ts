import { Router } from "express";
import { validateAccount } from "./middlewares/accounts";
import {
  validateExistsUser,
  validateExistsUserUpdate,
  validateUser,
} from "./middlewares/users";
import requestBody from "./middlewares/validateBody";
import { schemaUserLogin, schemaUserRegister } from "./schemas/users";
import { deleteAccount, registerAccount } from "./controllers/accounts";
import { createDB } from "./controllers/db";
import { loginUser, updateUser } from "./controllers/users";
import { authenticateUser } from "./middlewares/authentication";
import { schemaDeposit } from "./schemas/transactions";
import { deposit } from "./controllers/transactions";

const routes = Router();

routes.get("/create-database", createDB);

routes.post(
  "/account",
  validateExistsUser,
  requestBody(schemaUserRegister),
  registerAccount
);

routes.post("/login", requestBody(schemaUserLogin), validateUser, loginUser);

routes.put(
  "/account/:number_account/user",
  authenticateUser,
  validateAccount,
  requestBody(schemaUserRegister),
  validateExistsUserUpdate,
  updateUser
);

routes.delete(
  "/account/:number_account",
  authenticateUser,
  validateAccount,
  deleteAccount
);

routes.post(
  "/transactions/deposit/:number_account",
  validateAccount,
  requestBody(schemaDeposit),
  deposit
);

export default routes;
