import bcrypt from "bcrypt";
import { Request, Response } from "express";
import ErrorObj from "../types/Error";
import BankModel from "../database/models/Bank";
import AccountSchemaModel from "../database/models/Account";
import UserSchemaModel from "../database/models/User";

export const registerAccount = async (req: Request, res: Response) => {
  //   const jwtPass = process.env.JWT_PASS;
  const { name, username, cpf, phone, date_of_birth, password } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const bank = await BankModel.findOne();

    if (!bank) {
      return res.status(500).json({ message: "Erro insperado" });
    }

    const numberSerial = bank.number_account_serial as number;
    const updateNumberSerialAccount = numberSerial + 1;

    const newUser = {
      name,
      username,
      cpf,
      phone,
      date_of_birth,
      password: encryptedPassword,
    };

    await UserSchemaModel.create(newUser);

    const newAccount = {
      number_account: updateNumberSerialAccount,
      user: newUser,
    };

    await AccountSchemaModel.create(newAccount);

    bank.number_account_serial = updateNumberSerialAccount;

    await bank.save();
    const { password: passwordUser, ...userRegisted } = newUser;

    return res.json(userRegisted);
  } catch (error) {
    const errorObj = error as ErrorObj;

    return res.status(500).json({ message: errorObj.message });
  }
};
