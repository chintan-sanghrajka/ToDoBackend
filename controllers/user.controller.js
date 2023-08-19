import UserModel from "./../models/user.model.js";

export const getUser = async (req, res) => {
  const userName = req.params.username;
  try {
    const UserDetails = await UserModel.find({ userName: userName, status: 1 });

    if (UserDetails.length !== 0) {
      res.status(200).json({
        data: UserDetails,
        message: "User Fetched Successfully",
      });
    } else {
      res.status(400).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addUser = (req, res) => {
  try {
    const date = new Date();
    const completedDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const { firstName, lastName, userName, emailId, password } = req.body;
    const newUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      emailId: emailId,
      password: password,
      createdOn: completedDate,
    });
    newUser.save();

    if (newUser) {
      return res.status(201).json({
        data: newUser,
        message: "User Created Successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const updatedUser = await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          status: 9,
        },
      }
    );
    if (updatedUser.acknowledged) {
      return res.status(200).json({
        message: "User Deleted successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
