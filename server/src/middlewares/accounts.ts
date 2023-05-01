import { Request, Response, NextFunction } from "express";
import ErrorObj from "../types/Error";
import UserSchemaModel from "../database/models/User";
import AccountSchemaModel, { AccountSchema } from "../database/models/Account";

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

export const validateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { number_account } = req.params;
  try {
    const findAccount = await AccountSchemaModel.findOne({
      number_account: Number(number_account),
    });

    if (!findAccount) {
      return res.status(404).json({ message: "Conta não encontrada!" });
    }

    (req as any).account = findAccount;

    next();
  } catch (error) {}
};
