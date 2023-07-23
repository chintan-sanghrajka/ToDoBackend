import UserModel from "./../models/user.model.js";

export const getUser = async (req, res) => {
  const userName = req.params.username;
  //   console.log(userName);
  try {
    const UserDetails = await UserModel.find({ userName: userName });
    // console.log(UserDetails.length);

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
