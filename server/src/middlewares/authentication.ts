import { NextFunction, Request, Response, json } from "express";
import ErrorObj from "../types/Error";
import jwt from "jsonwebtoken";
import { User, VerifyUser } from "../types/User";
import UserSchemaModel from "../database/models/User";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtPass = process.env.JWT_PASS;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const verifyUser: unknown = jwt.verify(token, jwtPass as string);
    const { username } = verifyUser as VerifyUser;

    const user: unknown = await UserSchemaModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Não autorizado!" });
    }

    (req as any).userLogged = user as User;

    next();
  } catch (error) {
    const errorObj = error as ErrorObj;
    return res.status(500).json({ message: errorObj.message });
  }
};
