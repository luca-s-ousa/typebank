import { Request, Response, json } from "express";
import bcrypt from "bcrypt";
import { Account } from "../types/Account";
import AccountSchemaModel from "../database/models/Account";
import { User } from "../types/User";
import ErrorObj from "../types/Error";
import UserSchemaModel from "../database/models/User";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
  const jwtPass = process.env.JWT_PASS;
  const userAuth = (req as any).authorizeUser as User;

  try {
    const token = jwt.sign({ username: userAuth.username }, jwtPass as string, {
      expiresIn: "8h",
    });

    const { name, username, cpf, date_of_birth, phone } = userAuth;

    return res.json({
      user: { name, username, cpf, date_of_birth, phone },
      token,
    });
  } catch (error) {
    const errorObj = error as ErrorObj;

    return res.status(500).json({ message: errorObj.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const account = (req as any).account as Account;

  const { name, username, cpf, date_of_birth, phone, password } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const userUpdate: User = {
      name,
      username,
      cpf,
      date_of_birth,
      phone,
      password: encryptedPassword,
    };

    await AccountSchemaModel.updateOne(
      { number_account: account.number_account },
      {
        $set: {
          user: userUpdate,
        },
      }
    );

    await UserSchemaModel.updateOne(
      { username: account.user.username },
      {
        $set: userUpdate,
      }
    );

    return res.status(200).json({ message: "Seus dados foram atualizados!" });
  } catch (error) {
    const errorObj = error as ErrorObj;

    return res.status(500).json({ message: errorObj.message });
  }
};
