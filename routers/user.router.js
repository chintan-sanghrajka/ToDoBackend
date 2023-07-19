import express from "express";
import { getUser, addUser } from "./../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/get-user/:username", getUser);

userRouter.post("/add-user", addUser);

export default userRouter;
