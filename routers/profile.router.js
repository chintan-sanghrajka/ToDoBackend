import express from "express";
import {
  addProfile,
  getProfile,
  deleteProfilePic,
  updateProfile,
} from "./../controllers/profile.controller.js";

const profileRouter = express.Router();

profileRouter.post("/add-profile", addProfile);

profileRouter.get("/get-profile", getProfile);

profileRouter.post("/delete-profile-pic", deleteProfilePic);

profileRouter.post("/update-profile", updateProfile);

export default profileRouter;
