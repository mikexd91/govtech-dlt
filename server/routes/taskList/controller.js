const respond = require("../../utils/response-util"); // Used for giving standardized responses
const {
  BadRequestError,
  InternalServerError,
} = require("../../utils/response-util/httpErrorTypes");
const { Tasks } = require("../../models/task");
const isEmpty = require("lodash/isEmpty");
const { query } = require("express");
// Exported Method Description: API Main Logic

/**
 * This function comment is parsed by doctrine
 * @route GET /api/tasklist
 * @group Task List - Operations to fetch/add/update/remove tasks
 * @returns {object} 200 - An array of Tasks
 * @returns {Error}  400 - Valdiation Error
 * @returns {Error}  400 - Bad Request Error
 * @returns {Error}  500 - Internal Server Error
 */
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

/**
 * @typedef AddTask
 * @property {string} taskTitle.required - Title - eg: Test entry
 * @property {string} priority - Priority - eg: LOW PRIORITY
 * @property {string} dueDate - Due Date - eg: DD-MM-YYYY
 */

/**
 * Add Task to tasklist
 * @route POST /api/tasklist/{id}
 * @group Task List
 * @param {string} id.path.required - id of the task list
 * @param {AddTask.model} entry.body
 * @returns {object} 200 - An array of Tasks
 * @returns {Error}  400 - Valdiation Error
 * @returns {Error}  400 - Bad Request Error
 * @returns {Error}  500 - Internal Server Error
 */
module.exports.addToTaskListController = (req, res) => {
  try {
    const { id } = req.params;
    const { taskTitle, priority, dueDate } = req.body;
    let taskList;

    if (req.session.taskList === undefined) {
      taskList = new TaskList().getTaskList();
    } else {
      taskList = req.session.taskList;
    }

    if (taskList.id === id) {
      const task = new Tasks(taskTitle, priority, dueDate);
      taskList.tasks.push(task);
      req.session.taskList = taskList;
    } else {
      throw new BadRequestError({ message: "Tasklist Id not found" });
    }

    respond.success(res, taskList);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};

/**
 * @typedef UpdateTask
 * @property {string} taskTitle - Title - eg: Test entry
 * @property {string} status - status - eg: DONE
 * @property {string} priority - Priority - eg: LOW PRIORITY
 * @property {string} dueDate - Due Date - eg: DD-MM-YYYY
 */

/**
 * Update Task to tasklist
 * @route PUT /api/tasklist/{id}/task/{taskId}
 * @group Task List
 * @param {UpdateTask.model} entry.body
 * @param {string} id.path.required - id of the task list
 * @param {string} taskId.path.required - id of the task
 * @returns {object} 200 - An array of Tasks
 * @returns {Error}  400 - Valdiation Error
 * @returns {Error}  400 - Bad Request Error
 * @returns {Error}  500 - Internal Server Error
 */
module.exports.updateTaskController = (req, res) => {
  try {
    const { id, taskId } = req.params;
    const { taskTitle, status, priority, dueDate } = req.body;

    if (req.session.taskList === undefined) {
      throw new InternalServerError();
    } else {
      taskList = req.session.taskList;
    }
    if (taskList.id === id) {
      taskList.tasks.map((task) => {
        if (task.taskId === taskId) {
          taskTitle ? (task.task = taskTitle) : null;
          priority ? (task.priority = priority) : null;
          dueDate ? (task.dueDate = dueDate) : null;
          status ? (task.status = status) : null;
        }
      });
    } else {
      throw new BadRequestError({ message: "Tasklist Id not found" });
    }
    req.session.taskList = taskList;
    respond.success(res, taskList);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};

/**
 * Delete Task to tasklist
 * @route POST /api/tasklist/{id}/task/{taskId}
 * @group Task List
 * @param {string} id.path.required - id of the task list
 * @param {string} taskId.path.required - id of the task
 * @returns {object} 200 - An array of Tasks
 * @returns {Error}  400 - Valdiation Error
 * @returns {Error}  400 - Bad Request Error
 * @returns {Error}  500 - Internal Server Error
 */
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
        throw new BadRequestError({ message: "Tasklist Id not found" });
      }
    }

    respond.success(res, taskList);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};

/**
 * Delete TaskList
 * @route DELETE /api/tasklist
 * @group Task List
 * @returns {object} 200 - An array of Tasks
 * @returns {Error}  400 - Valdiation Error
 * @returns {Error}  400 - Bad Request Error
 * @returns {Error}  500 - Internal Server Error
 */
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
