import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  phone: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const UserSchemaModel = mongoose.model("UserSchema", UserSchema);

export default UserSchemaModel;
