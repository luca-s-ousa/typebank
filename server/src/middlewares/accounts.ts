import { Request, Response, NextFunction } from "express";
import ErrorObj from "../types/Error";
import UserSchemaModel from "../database/models/User";

export const validateExistsUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, cpf } = req.body;
  try {
    const user = await UserSchemaModel.findOne({
      $or: [{ username }, { cpf }],
    });

    if (user) {
      return res
        .status(400)
        .json({ message: "O username/cpf informado já existe!" });
    }

    next();
  } catch (error) {
    const errorObj = error as ErrorObj;
    return res.status(500).json({ message: errorObj.message });
  }
};
