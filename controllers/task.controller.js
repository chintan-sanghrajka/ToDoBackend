import TaskModel from "./../models/task.model";

export const getTask = async (req, res) => {
  const taskId = req.params.task_id;
  //   console.log(taskId);
  try {
    const taskDetails = await TaskModel.find({ _id: taskId });
    res.status(200).json({
      data: taskDetails,
      message: "Tasks Fetched Successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserTask = async (req, res) => {
  // const userTask = await TaskModel.aggregate([
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "userId",
  //       foreignField: "_id",
  //       as: "user",
  //     },
  //   },
  //   { $unwind: "$user" },
  // ]);
  // console.log(userTask);

  const { q, page, limit } = req.query;
  const rgx = (pattern) => new RegExp(`.*${pattern}*.`);
  const searchRgx = rgx(q);

  let filterConfig = { status: 1 };
  if (q != undefined) {
    filterConfig = {
      ...filterConfig,
      $or: [
        { task: { $regex: searchRgx, $options: "i" } },
        { author: { $regex: searchRgx, $options: "i" } },
      ],
    };
  }
  const skipno = (Number(page) - 1) * limit;
  const product_data = await TaskModel.find(filterConfig)
    .populate("userId")
    .limit(limit)
    .skip(skipno);
  // console.log(product_data);
};

export const addTask = (req, res) => {
  try {
    const { task, author, date, userId } = req.body;
    const newTask = new TaskModel({
      task: task,
      author: author,
      createdOn: date,
      userId: userId,
    });
    newTask.save();

    if (newTask) {
      return res.status(201).json({
        data: newTask,
        message: "Task Created Successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTaskList = async (req, res) => {
  try {
    const { statusId, userId, page, limit } = req.query;
    console.log(statusId, userId);
    console.log(page);
    const skipNo = Number(page) === 1 ? 0 : (Number(page) - 1) * limit - 1;
    console.log(skipNo);
    const tasks = await TaskModel.find({
      status: statusId,
      userId: userId,
    });
    // console.log(tasks.length);
    const taskDetails = await TaskModel.find({
      status: statusId,
      userId: userId,
    })
      .limit(limit)
      .skip(skipNo);
    // console.log(taskDetails, tasks.length);
    res.status(200).json({
      data: taskDetails,
      taskLength: tasks.length,
      message: "Tasks Fetched Successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const completeTask = async (req, res) => {
  try {
    const taskId = req.params.task_id;
    // console.log(taskId);
    const date = new Date();
    const completedDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const completed = await TaskModel.updateOne(
      { _id: taskId },
      { $set: { status: 5, completedOn: completedDate } }
    );
    if (completed.acknowledged) {
      return res.status(200).json({
        message: "Task Marked as completed Successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.task_id;
    // console.log(taskId);
    const completed = await TaskModel.updateOne(
      { _id: taskId },
      { $set: { status: 9 } }
    );
    if (completed.acknowledged) {
      return res.status(200).json({
        message: "Task Deleted Successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.task_id;
    const { task, author } = req.body;
    const updatedTask = await TaskModel.updateOne(
      { _id: taskId },
      {
        $set: {
          task: task,
          author: author,
        },
      }
    );
    if (updatedTask.acknowledged) {
      return res.status(200).json({
        message: "Task Updated successfully.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
