import DepositModel from "../../database/models/Deposits";
import WithdrawalsModel from "../../database/models/Withdrawals";
import { Deposit } from "../../types/Deposit";
import { Withdraw } from "../../types/Withdraw";
import ErrorObj from "../../types/Error";
import { dateAndHours } from "../util/formatData";
import TransferModel from "../../database/models/Transfers";
import { Transfer } from "../../types/Transfer";

export const deposits = async (number_account: number) => {
  try {
    const deposits: unknown = await DepositModel.find({ number_account });
    const responseDeposits = deposits as Deposit[];

    const formatDeposits = responseDeposits.map((deposit) => {
      return {
        _id: deposit._id,
        date: dateAndHours(deposit.date),
        number_account: deposit.number_account,
        value: deposit.value,
      };
    });

    return formatDeposits;
  } catch (error) {
    const errorObj = error as ErrorObj;

    return errorObj.message;
  }
};

export const withdrawals = async (number_account: number) => {
  try {
    const withdrawals: unknown = await WithdrawalsModel.find({
      number_account,
    });

    const responseWithdrawals = withdrawals as Withdraw[];

    const formatWithdrawals = responseWithdrawals.map((withdraw) => {
      return {
        _id: withdraw._id,
        date: dateAndHours(withdraw.date as Date),
        number_account: withdraw.number_account,
        value: withdraw.value,
      };
    });

    return formatWithdrawals;
  } catch (error) {
    const errorObj = error as ErrorObj;

    return errorObj.message;
  }
};

export const transfers = async (number_account: number, sent: boolean) => {
  try {
    const transfer: unknown = sent
      ? await TransferModel.find({ source_account_number: number_account })
      : await TransferModel.find({
          destination_account_number: number_account,
        });

    const responseTransfer = transfer as Transfer[];

    const formatTransfer = responseTransfer.map((transfer) => {
      return {
        _id: transfer._id,
        date: dateAndHours(transfer.date as Date),
        source_account_number: transfer.source_account_number,
        destination_account_number: transfer.destination_account_number,
        value: transfer.value,
      };
    });

    return formatTransfer;
  } catch (error) {
    const errorObj = error as ErrorObj;
    return errorObj.message;
  }
};
