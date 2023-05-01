import mongoose from "mongoose";
import { AccountSchema } from "./Account";
import { WithdrawalSchema } from "./Withdrawals";
import { DepositSchema } from "./Deposits";
import { TransferSchema } from "./Transfers";

export const BankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  agency: {
    type: String,
    required: true,
  },
  number_account_serial: {
    type: Number,
    unique: true,
  },
  accounts: [AccountSchema],
  withdrawals: [WithdrawalSchema],
  deposits: [DepositSchema],
  transfers: [TransferSchema],
});

const BankModel = mongoose.model("BankSchema", BankSchema);

export default BankModel;
