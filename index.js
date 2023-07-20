import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/user.router";
import taskRouter from "./routers/task.router";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8001;
const DBLink = process.env.DBLink;

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.static(__dirname));

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
