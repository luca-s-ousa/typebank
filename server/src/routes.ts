import { Router } from "express";
import { validateAccount } from "./middlewares/accounts";
import {
  validateExistsUser,
  validateExistsUserUpdate,
} from "./middlewares/users";
import requestBody from "./middlewares/validateBody";
import { schemaUserRegister } from "./schemas/users";
import { registerAccount } from "./controllers/accounts";
import { createDB } from "./controllers/db";
import { updateUser } from "./controllers/users";

const routes = Router();

routes.get("/create-database", createDB);

routes.post(
  "/account",
  validateExistsUser,
  requestBody(schemaUserRegister),
  registerAccount
);

routes.put(
  "/account/:number_account/user",
  validateAccount,
  validateExistsUserUpdate,
  requestBody(schemaUserRegister),
  updateUser
);

export default routes;
