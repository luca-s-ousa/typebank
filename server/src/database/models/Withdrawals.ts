import mongoose from "mongoose";

export const WithdrawalSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  number_account: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const WithdrawalsModel = mongoose.model("WithdrawalSchema", WithdrawalSchema);

export default WithdrawalsModel;
