import { Router } from "express";
import { validateExistsUser } from "./middlewares/accounts";
import requestBody from "./middlewares/validateBody";
import { schemaUserRegister } from "./schemas/users";
import { registerAccount } from "./controllers/accounts";
import { createDB } from "./controllers/db";

const routes = Router();

routes.get("/create-database", createDB);

routes.post(
  "/account",
  validateExistsUser,
  requestBody(schemaUserRegister),
  registerAccount
);

export default routes;
