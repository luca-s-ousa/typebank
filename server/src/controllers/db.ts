import { Request, Response } from "express";
import BankModel from "../database/models/Bank";

export const createDB = async (_: Request, res: Response) => {
  const bank = new BankModel({
    name: "TypeBank",
    number: "1234",
    agency: "0001",
    number_account_serial: 0,
  });

  try {
    const bankData = await bank.save();

    return res.json(bankData);
  } catch (error) {
    console.log(error);
  }
};
