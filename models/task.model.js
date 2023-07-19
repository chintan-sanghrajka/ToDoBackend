import mongoose from "mongoose";
import UserModel from "./user.model";

const Schema = mongoose.Schema;

const TaskModel = new Schema({
  task: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  createdOn: {
    type: String,
    required: true,
  },
  completedOn: {
    type: String,
    default: "",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: UserModel,
  },
});

export default mongoose.model("tasks", TaskModel);
