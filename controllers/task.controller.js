import TaskModel from "./../models/task.model.js";

export const getTask = async (req, res) => {
  const taskId = req.params.task_id;
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
    const skipNo = Number(page) === 1 ? 0 : (Number(page) - 1) * limit;
    const tasks = await TaskModel.find({
      status: statusId,
      userId: userId,
    });
    const taskDetails = await TaskModel.find({
      status: statusId,
      userId: userId,
    })
      .limit(limit)
      .skip(skipNo);
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
