import mongoose from "mongoose";

export const TransferSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  source_account_number: {
    type: Number,
    required: true,
  },
  destination_account_number: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const TransferModel = mongoose.model("TransferSchema", TransferSchema);

export default TransferModel;
