import { Request, Response, NextFunction } from "express";
import ErrorObj from "../types/Error";
import UserSchemaModel from "../database/models/User";
import { Account } from "../types/Account";

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

export const validateExistsUserUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, cpf } = req.body;

  const account = (req as any).account as Account;

  try {
    if (account.user.username !== username) {
      const verifyUsername = await UserSchemaModel.findOne({ username });

      if (verifyUsername) {
        return res.status(400).json({ message: "Username já registrado!" });
      }
    }

    if (account.user.cpf !== cpf) {
      const verifyCPF = await UserSchemaModel.findOne({ cpf });

      if (verifyCPF) {
        return res.status(400).json({ message: "CPF já registrado!" });
      }
    }

    next();
  } catch (error) {
    const errorObj = error as ErrorObj;
    return res.status(500).json({ message: errorObj.message });
  }
};
