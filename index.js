import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/user.router.js";
import taskRouter from "./routers/task.router.js";
import profileRouter from "./routers/profile.router.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const DBLink = process.env.DBLink;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

app.listen(process.env.PORT, () => {
  console.log("Listening on port : ", PORT);
});

mongoose
  .connect(DBLink)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(userRouter);

app.use(taskRouter);

app.use(profileRouter);
