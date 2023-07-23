import mongoose from "mongoose";
import UserModel from "./user.model.js";

const Schema = mongoose.Schema;

const ProfileModel = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: UserModel,
  },
  status: {
    type: Number,
    default: 1,
  },
  avatar: {
    type: String,
    default: "",
  },
});

export default mongoose.model("profiles", ProfileModel);
