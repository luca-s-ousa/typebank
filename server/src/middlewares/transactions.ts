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
      return res.status(400).json({
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

export const validateTransfer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { destination_account_number, password: passBody, value } = req.body;
  const { password, username } = (req as any).userLogged as User;

  try {
    const validPass = await bcrypt.compare(passBody as string, password);

    if (!validPass) {
      return res.status(400).json({ message: "Senha incorreta!" });
    }

    const findAccountDest = await AccountSchemaModel.findOne({
      number_account: Number(destination_account_number),
    });

    if (!findAccountDest) {
      return res.status(404).json({ message: "Conta não encontrada!" });
    }

    (req as any).account_destination = findAccountDest;

    const account_user_logged: any = await AccountSchemaModel.findOne({
      "user.username": username,
    });

    if (
      findAccountDest.number_account ===
      (account_user_logged.number_account as number)
    ) {
      return res
        .status(400)
        .json({ message: "Você não pode transferir para si mesmo!" });
    }

    const { balance } = account_user_logged as Account;

    if (Number(value) > balance) {
      return res.status(400).json({
        message: `Você só tem R$ ${balance.toFixed(2)} reais na sua conta!`,
      });
    }

    (req as any).account = account_user_logged;

    next();
  } catch (error) {
    const errorObj = error as ErrorObj;

    return res.status(500).json({ message: errorObj.message });
  }
};
