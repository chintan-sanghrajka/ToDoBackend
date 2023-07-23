import ProfileModel from "../models/profile.model.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads")) {
      cb(null, "./uploads");
    } else {
      fs.mkdirSync("./uploads", true);
      cb(null, "./uploads");
    }
  },
  filename: function (req, file, cb) {
    const imgName = file.originalname;
    const imgArr = imgName.split(".");
    imgArr.pop();
    const imgExt = path.extname(imgName);
    const fname = imgArr.join(".") + "-" + Date.now() + imgExt;
    cb(null, fname);
  },
});

const upload = multer({ storage: storage });

export const addProfile = (req, res) => {
  try {
    const uploadFile = upload.single("avatar");

    uploadFile(req, res, function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const { status, userId } = req.body;
      let image = "";
      if (req.file !== undefined) {
        image = req.file.filename;
      }

      const profile_model = new ProfileModel({
        userId: userId,
        status: status,
        avatar: image,
      });
      profile_model.save();

      if (profile_model) {
        res.status(201).json({
          data: profile_model,
          message: "data added seccessfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: message.error,
    });
  }
};

export const updateProfilePic = async (image, userId) => {
  const updatedProfile = await ProfileModel.updateOne(
    { userId: userId, status: 1 },
    {
      $set: {
        avatar: image,
      },
    }
  );
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.query;
    upload.single("avatar")(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      let image = "";
      if (req.file) {
        image = req.file.filename;
      }
      updateProfilePic(image, userId);
      return res.status(200).json({ message: "Profile updated successfully" });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.query;
    const profile = await ProfileModel.find({ userId: userId, status: 1 });
    res.status(200).json({
      profile: profile,
      message: "Profile fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProfilePic = async (req, res) => {
  try {
    const { userId } = req.query;
    const updatedProfile = await ProfileModel.updateMany(
      { userId: userId },
      {
        $set: {
          status: 9,
        },
      }
    );
    if (updatedProfile.acknowledged) {
      const profile_model = new ProfileModel({
        userId: userId,
        status: 1,
        avatar: "",
      });
      profile_model.save();
      return res.status(200).json({
        message: "Picture deleted successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
