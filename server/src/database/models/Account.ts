import mongoose from "mongoose";
import UserSchemaModel from "./User";

export const AccountSchema = new mongoose.Schema({
  number_account: { type: Number, unique: true },
  balance: { type: Number, default: 0 },
  user: { type: UserSchemaModel.schema, required: true },
});

const AccountSchemaModel = mongoose.model("AccountSchema", AccountSchema);

export default AccountSchemaModel;
