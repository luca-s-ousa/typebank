import mongoose from "mongoose";

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
});

const BankModel = mongoose.model("BankSchema", BankSchema);

export default BankModel;
