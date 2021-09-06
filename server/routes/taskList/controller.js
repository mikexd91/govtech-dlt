const respond = require('../../utils/response-util'); // Used for giving standardized responses
const { BadRequestError } = require('../../utils/response-util/BadRequestError');

const { Tasks } = require('../../models/task');
// Exported Method Description: API Main Logic

/**
 * This function comment is parsed by doctrine
 * @route GET /api/tasklist/all
 * @group Task List - Operations to fetch/add/update/remove tasks
 * @returns {object} 200 - An array of Tasks
 * @returns {Error}  400 - Valdiation Error
 * @returns {Error}  400 - Bad Request Error
 * @returns {Error}  500 - Internal Server Error
 */
module.exports.fetchAllTaskListsController = (req, res) => {
  try {
    const { user } = req.query;
    let taskLists = [];
    let userTaskLists = [];
    if (req.session.taskLists === undefined) {
      req.session.taskLists = [];
    } else {
      taskLists = req.session.taskLists;
      const { users } = req.session;
      const userObject = users.find((o) => o.id === user);
      if (user !== undefined) {
        if (userObject === undefined) throw new BadRequestError({ message: 'User Id not found' });
        taskLists.forEach((item) => {
          let newObject = {};
          if (userObject.taskListId !== item.id) {
            newObject.id = item.id;
            newObject.publicTasks = item.publicTasks;
          } else {
            newObject = item;
          }
          userTaskLists.push(newObject);
        });
      } else {
        userTaskLists = taskLists;
      }
    }

    respond.success(res, userTaskLists);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};

/**
 * This function comment is parsed by doctrine
 * @route GET /api/tasklist/{id}
 * @group Task List - Operations to fetch/add/update/remove tasks
 * @param {string} id.path.required - id of the task list
 * @returns {object} 200 - An array of Tasks
 * @returns {Error}  400 - Valdiation Error
 * @returns {Error}  400 - Bad Request Error
 * @returns {Error}  500 - Internal Server Error
 */
module.exports.fetchTaskListController = (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.query;

    let taskLists;
    let queryTaskList;
    let resultList = {};
    if (req.session.taskLists === undefined) {
      req.session.taskLists = [];
    } else {
      taskLists = req.session.taskLists;
      queryTaskList = taskLists.find((o) => o.id === id);

      const { users } = req.session;
      const userObject = users.find((o) => o.id === user);
      if (userObject === undefined) throw new BadRequestError({ message: 'User Id not found' });
      if (queryTaskList === undefined) throw new BadRequestError({ message: 'Tasklist Id not found' });

      if (userObject.taskListId !== id) {
        resultList.id = queryTaskList.id;
        resultList.publicTasks = queryTaskList.publicTasks;
      } else {
        resultList = queryTaskList;
      }
    }
    respond.success(res, resultList);
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
    const { user } = req.query;
    const {
      taskTitle, priority, dueDate, isPrivate,
    } = req.body;

    let taskLists;
    let queryTaskList;
    let taskListFound = false;
    if (req.session.taskLists === undefined) {
      req.session.taskLists = [];
    } else {
      taskLists = req.session.taskLists;
      queryTaskList = taskLists.find((o) => o.id === id);

      const { users } = req.session;
      const userObject = users.find((o) => o.id === user);
      if (userObject === undefined) throw new BadRequestError({ message: 'User Id not found' });
      if (queryTaskList === undefined) throw new BadRequestError({ message: 'Tasklist Id not found' });

      if (userObject.taskListId === id) {
        taskLists.forEach((tasklist) => {
          if (tasklist.id === id) {
            taskListFound = true;
            const task = new Tasks(taskTitle, priority, dueDate);
            // eslint-disable-next-line no-unused-expressions
            isPrivate ? tasklist.privateTasks.push(task) : tasklist.publicTasks.push(task);
            queryTaskList = tasklist;
          }
        });
      } else {
        throw new BadRequestError({ message: 'You do not have access to update this tasklist' });
      }
      req.session.taskLists = taskLists;
    }

    if (!taskListFound) throw new BadRequestError({ message: 'Tasklist Id not found' });

    respond.success(res, queryTaskList);
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
    const { user } = req.query;
    const {
      taskTitle, status, priority, dueDate,
    } = req.body;

    let taskLists;
    let queryTaskList;

    if (req.session.taskLists === undefined) {
      req.session.taskLists = [];
    } else {
      taskLists = req.session.taskLists;
      queryTaskList = taskLists.find((o) => o.id === id);

      const { users } = req.session;
      const userObject = users.find((o) => o.id === user);
      if (userObject === undefined) throw new BadRequestError({ message: 'User Id not found' });
      if (queryTaskList === undefined) throw new BadRequestError({ message: 'Tasklist Id not found' });

      if (userObject.taskListId === id) {
        queryTaskList.privateTasks.map((o) => {
          const task = o;
          if (task.taskId === taskId) {
            if (taskTitle) task.task = taskTitle;
            if (priority) task.priority = priority;
            if (dueDate)task.dueDate = dueDate;
            if (status) task.status = status;
          }
          return task;
        });

        queryTaskList.publicTasks.map((o) => {
          const task = o;
          if (task.taskId === taskId) {
            if (taskTitle) task.task = taskTitle;
            if (priority) task.priority = priority;
            if (dueDate)task.dueDate = dueDate;
            if (status) task.status = status;
          }
          return task;
        });
      } else {
        throw new BadRequestError({ message: 'You do not have access to update this tasklist' });
      }
    }

    req.session.taskLists = taskLists;
    respond.success(res, queryTaskList);
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
    const { user } = req.query;
    let taskLists;
    let queryTaskList;

    if (req.session.taskLists === undefined) {
      req.session.taskLists = [];
    } else {
      taskLists = req.session.taskLists;

      taskLists = req.session.taskLists;
      queryTaskList = taskLists.find((o) => o.id === id);

      const { users } = req.session;
      const userObject = users.find((o) => o.id === user);
      if (userObject === undefined) throw new BadRequestError({ message: 'User Id not found' });
      if (queryTaskList === undefined) throw new BadRequestError({ message: 'Tasklist Id not found' });

      if (userObject.taskListId === id) {
        queryTaskList.privateTasks = queryTaskList.privateTasks.filter(
          (el) => el.taskId !== taskId,
        );
        queryTaskList.publicTasks = queryTaskList.publicTasks.filter(
          (el) => el.taskId !== taskId,
        );
      } else {
        throw new BadRequestError({ message: 'You do not have access to update this tasklist' });
      }
    }

    respond.success(res, queryTaskList);
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
    const taskList = [];
    req.session.taskLists = null;

    respond.success(res, taskList);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};
