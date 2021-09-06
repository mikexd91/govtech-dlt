/* eslint-disable no-param-reassign */
const respond = require('../../utils/response-util'); // Used for giving standardized responses
const { BadRequestError } = require('../../utils/response-util/BadRequestError');
const { User } = require('../../models/user');
const { TaskList } = require('../../models/taskList');

// Exported Method Description: API Main Logic

/**
 * This function comment is parsed by doctrine
 * @route GET /api/users
 * @group Fetch Users - Operations to fetch/add/update/remove users
 * @returns {object} 200 - An array of Tasks
 * @returns {Error}  400 - Valdiation Error
 * @returns {Error}  400 - Bad Request Error
 * @returns {Error}  500 - Internal Server Error
 */
module.exports.fetchUsersController = (req, res) => {
  try {
    let users;
    if (req.session.users === undefined) {
      users = [];
    } else {
      users = req.session.users;
    }

    respond.success(res, users);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};

/**
 * @typedef User User
 * @property {string} name.required - Name - eg: Mike
 */

/**
 * Login User
 * @route POST /api/user/login
 * @group User
 * @param {User.model} entry.body
 * @returns {object} 200 - An user object
 * @returns {Error}  400 - Valdiation Error
 * @returns {Error}  400 - Bad Request Error
 * @returns {Error}  500 - Internal Server Error
 */
module.exports.loginUserController = (req, res) => {
  try {
    const { name } = req.body;
    let user = [];
    let taskLists = [];
    const resultLists = [];
    if (req.session.users === undefined) {
      req.session.users = [];
    } else {
      const { users } = req.session;
      user = users.find((o) => o.name === name);
      if (!user) {
        throw new BadRequestError({ message: 'User not found' });
      }

      if (req.session.taskLists === undefined) {
        req.session.taskLists = [];
      } else {
        taskLists = req.session.taskLists;
        users.forEach((item) => {
          const tasklist = taskLists.find((o) => o.id === item.taskListId);
          const newObject = {};
          if (user.taskListId === tasklist.id) {
            newObject.privateTasks = tasklist.privateTasks;
          }
          newObject.name = item.name;
          newObject.id = item.id;
          newObject.publicTasks = tasklist.publicTasks;
          newObject.taskListId = tasklist.id;
          resultLists.push(newObject);
        });
      }
    }

    respond.success(res, resultLists);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};

/**
 * Register User
 * @route POST /api/user/register
 * @group User
 * @param {User.model} entry.body
 * @returns {object} 200 - An user object
 * @returns {Error}  400 - Valdiation Error
 * @returns {Error}  400 - Bad Request Error
 * @returns {Error}  500 - Internal Server Error
 */
module.exports.registerUserController = (req, res) => {
  try {
    const { name } = req.body;
    let taskLists;
    let newTaskList;
    if (req.session.taskLists === undefined) {
      newTaskList = new TaskList().getTaskList();
      taskLists = [newTaskList];
    } else {
      taskLists = req.session.taskLists;
      newTaskList = new TaskList().getTaskList();
      taskLists.push(newTaskList);
    }

    req.session.taskLists = taskLists;

    const user = new User(name, newTaskList.id);

    const result = {
      id: user.getId(),
      name: user.getName(),
      taskListId: user.getTaskListId(),
      friends: user.getFriends(),
    };

    if (req.session.users === undefined) {
      req.session.users = [result];
    } else {
      const { users } = req.session;
      users.push(result);
      req.session.users = users;
    }

    respond.success(res, result);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};

/**
 * @typedef UpdateUser
 * @property {string} name - friends - eg: mike
 * @property {string} friends - friends - eg: ["id"]
 */

/**
 * Update Task to tasklist
 * @route PUT /api/tasklist/{id}/task/{taskId}
 * @group Task List
 * @param {UpdateUser.model} entry.body
 * @param {string} id.path.required - id of the user
 * @returns {object} 200 - An array of Tasks
 * @returns {Error}  400 - Valdiation Error
 * @returns {Error}  400 - Bad Request Error
 * @returns {Error}  500 - Internal Server Error
 */
module.exports.updateUserController = (req, res) => {
  try {
    const { id } = req.params;
    const { name, friends } = req.body;

    let users;
    let queryUser;
    if (req.session.users === undefined) {
      throw new BadRequestError({ message: 'No Users found' });
    } else {
      users = req.session.users;
    }
    users.forEach((user) => {
      if (user.id === id) {
        if (name) {
          user.name = name;
        }

        if (friends) {
          user.friends = friends;
        }
        queryUser = user;
      }
    });

    req.session.users = users;
    respond.success(res, queryUser);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};

/**
 * Delete Users
 * @route DELETE /api/user
 * @group User
 * @returns {object} 200 - An array of Users
 * @returns {Error}  400 - Valdiation Error
 * @returns {Error}  400 - Bad Request Error
 * @returns {Error}  500 - Internal Server Error
 */
module.exports.removeUsersController = (req, res) => {
  try {
    const users = [];
    req.session.users = null;

    respond.success(res, users);
  } catch (error) {
    // Failure internal is meant to propagate the error message internally in the network
    respond.failure(res, error);
  }
};
