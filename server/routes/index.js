// -------- Essential Packages --------
const express = require('express');

const router = express.Router({ mergeParams: true });

// -------- Controllers --------
const {
  fetchAllTaskListsController,
  fetchTaskListController,
  addToTaskListController,
  removeFromTaskListController,
  removeTaskListController,
  updateTaskController,
} = require('./taskList/controller');

const {
  fetchUsersController,
  updateUserController,
  registerUserController,
  loginUserController,
} = require('./user/controller');

const { validateAddTaskReq } = require('./taskList/validator');

// -------- API Endpoints --------
// only one tasklist by default as of now
router.get('/taskList/all', fetchAllTaskListsController);
router.get('/taskList/:id', fetchTaskListController);
router.post('/taskList/:id', validateAddTaskReq, addToTaskListController);
router.post('/taskList/:id/task/:taskId', removeFromTaskListController);
router.put('/taskList/:id/task/:taskId', updateTaskController);
router.delete('/taskList', removeTaskListController);

router.get('/user', fetchUsersController);
router.put('/user/:id', updateUserController);
router.post('/user/register', registerUserController); // will also register a new list
router.post('/user/login', loginUserController);

module.exports = router;
