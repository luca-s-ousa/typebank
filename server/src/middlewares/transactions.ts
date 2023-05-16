import { Request, Response, NextFunction } from "express";
import ErrorObj from "../types/Error";
import bcrypt from "bcrypt";
import { User } from "../types/User";
import { Account } from "../types/Account";
import AccountSchemaModel from "../database/models/Account";

export const validateToWithdraw = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { value, password: passBody } = req.body;
  const { password, username } = (req as any).userLogged as User;
  const { number_account } = req.params;

  try {
    const validPass = await bcrypt.compare(
      passBody as string,
      password as string
    );

    if (!validPass) {
      return res.status(400).json({ message: "Senha incorreta!" });
    }

    const findAccount: unknown = await AccountSchemaModel.findOne({
      "user.username": username,
    });

    const { balance } = findAccount as Account;

    if (Number(value) > balance) {
      return res
        .status(400)
        .json({
          message: `Você só tem R$ ${balance.toFixed(2)} reais na conta!`,
        });
    }

    (req as any).account = findAccount;

    next();
  } catch (error) {
    const errorObj = error as ErrorObj;

    return res.status(500).json({ message: errorObj.message });
  }
};
