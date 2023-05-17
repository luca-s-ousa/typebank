import { Request, Response } from "express";
import ErrorObj from "../types/Error";
import DepositModel from "../database/models/Deposits";
import { Deposit } from "../types/Deposit";
import { dateAndHours } from "../functions/util/formatData";
import { Account } from "../types/Account";
import AccountSchemaModel from "../database/models/Account";
import WithdrawalsModel from "../database/models/Withdrawals";
import TransferModel from "../database/models/Transfers";

export const deposit = async (req: Request, res: Response) => {
  const { value } = req.body;
  const { number_account } = req.params;
  const { balance } = (req as any).account as Account;

  try {
    await AccountSchemaModel.updateOne(
      { number_account },
      { $set: { balance: balance + Number(value) } }
    );

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

export const toWithdraw = async (req: Request, res: Response) => {
  const { value } = req.body;
  const { balance, number_account } = (req as any).account as Account;
  const newBalance: number = balance - Number(value);

  try {
    await AccountSchemaModel.updateOne(
      { number_account },
      { $set: { balance: newBalance } }
    );

    const dataWithdraw = new WithdrawalsModel({
      value: Number(value),
      number_account,
    });

    const registerWithdraw: any = await dataWithdraw.save();

    const dateFormatted = dateAndHours(registerWithdraw.date as Date);

    return res.json({ date: dateFormatted, number_account, value });
  } catch (error) {
    const errorObj = error as ErrorObj;

    return res.status(500).json({ message: errorObj.message });
  }
};

export const transfer = async (req: Request, res: Response) => {
  const { value } = req.body;
  const {
    balance: balance_user_logged,
    number_account: number_account_user_logged,
  } = (req as any).account as Account;

  const {
    balance: balance_user_dest,
    number_account: number_account_user_dest,
  } = (req as any).account_destination as Account;

  const new_balance_user_logged = balance_user_logged - Number(value);
  const new_balance_user_dest = balance_user_dest + Number(value);

  try {
    await AccountSchemaModel.updateOne(
      {
        number_account: number_account_user_logged,
      },
      { $set: { balance: new_balance_user_logged } }
    );

    await AccountSchemaModel.updateOne(
      {
        number_account: number_account_user_dest,
      },
      { $set: { balance: new_balance_user_dest } }
    );

    const transfer = new TransferModel({
      destination_account_number: number_account_user_dest,
      source_account_number: number_account_user_logged,
      value: Number(value),
    });

    const registerTransfer = await transfer.save();

    const dateFormatted = dateAndHours(registerTransfer.date);

    return res.json({
      date: dateFormatted,
      source_account_number: number_account_user_logged,
      destination_account_number: number_account_user_dest,
      value: Number(value),
    });
  } catch (error) {
    const errorObj = error as ErrorObj;

    return res.status(500).json({ message: errorObj.message });
  }
};
