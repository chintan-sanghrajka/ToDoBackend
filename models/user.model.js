import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserModel = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("users", UserModel);
