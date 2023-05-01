import mongoose from "mongoose";

export const DepositSchema = new mongoose.Schema({
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

const DepositModel = mongoose.model("DepositSchema", DepositSchema);

export default DepositModel;
