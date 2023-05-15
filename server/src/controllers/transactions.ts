import { Request, Response } from "express";
import ErrorObj from "../types/Error";
import DepositModel from "../database/models/Deposits";
import { Deposit } from "../types/Deposit";
import { dateAndHours } from "../functions/util/formatData";

export const deposit = async (req: Request, res: Response) => {
  const { value } = req.body;
  const { number_account } = req.params;
  try {
    const newDeposit = new DepositModel({
      number_account: Number(number_account),
      value: Number(value),
    });

    const deposit: any = await newDeposit.save();

    const response = deposit as Deposit;

    const dateDepositFormatted = dateAndHours(response.date);

    const depositData = {
      date: dateDepositFormatted,
      number_account: response.number_account,
      value: response.value,
      _id: deposit._id as string,
    };

    return res.json(depositData);
  } catch (error) {
    const errorObj = error as ErrorObj;

    return res.status(500).json({ message: errorObj.message });
  }
};
