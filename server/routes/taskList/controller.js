const respond = require("../../utils/response-util"); // Used for giving standardized responses
const {
  BadRequestError,
  InternalServerError,
} = require("../../utils/response-util/httpErrorTypes");
const { TaskList } = require("../../models/taskList");
const { Tasks } = require("../../models/task");
// Exported Method Description: API Main Logic

module.exports.fetchTaskListController = (req, res) => {
  try {
    if (req.session.taskList === undefined) {
      taskList = new TaskList().getTaskList();
      req.session.taskList = taskList;
    } else {
      taskList = req.session.taskList;
    }

    respond.success(res, taskList);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};

module.exports.addToTaskListController = (req, res) => {
  try {
    const { taskTitle } = req.body;
    let taskList;

    if (req.session.taskList === undefined) {
      taskList = new TaskList().getTaskList();
    } else {
      taskList = req.session.taskList;
    }

    const task = new Tasks(taskTitle);
    taskList.tasks.push(task);
    req.session.taskList = taskList;

    respond.success(res, taskList);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};

module.exports.updateTaskController = (req, res) => {
  try {
    const { id, taskId } = req.params;
    const { taskTitle, status } = req.body;

    if (req.session.taskList === undefined) {
      throw new InternalServerError();
    } else {
      taskList = req.session.taskList;
    }
    if (taskList.id === id) {
      taskList.tasks.map((task) => {
        if (task.taskId === taskId) {
          taskTitle ? (task.task = taskTitle) : null;
          status ? (task.status = status) : null;
        }
      });
    }
    req.session.taskList = taskList;
    respond.success(res, taskList);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};

module.exports.removeFromTaskListController = (req, res) => {
  try {
    const { id, taskId } = req.params;
    let taskList;

    if (req.session.taskList === undefined) {
      throw new InternalServerError();
    } else {
      taskList = req.session.taskList;
      if (taskList.id === id) {
        const newTasksList = taskList.tasks.filter(
          (el) => el.taskId !== taskId
        );
        req.session.taskList.tasks = newTasksList;
      } else {
        throw new BadRequestError();
      }
    }

    respond.success(res, taskList);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};

module.exports.removeTaskListController = (req, res) => {
  try {
    let taskList = [];
    req.session.taskList = null;

    respond.success(res, taskList);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};
