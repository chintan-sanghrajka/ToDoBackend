import express from "express";
import {
  getUser,
  addUser,
  deleteUser,
} from "./../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/get-user/:username", getUser);

userRouter.post("/add-user", addUser);

userRouter.post("/delete-user", deleteUser);

export default userRouter;
