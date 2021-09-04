// -------- Essential Packages --------
const express = require("express");
const router = express.Router({ mergeParams: true });

// -------- Controllers --------
const {
  fetchTaskListController,
  addToTaskListController,
  removeFromTaskListController,
  removeTaskListController,
  updateTaskController,
} = require("./taskList/controller");

// -------- API Endpoints --------
// only one tasklist by default as of now
router.get("/taskList", fetchTaskListController);
router.post("/taskList", addToTaskListController);
router.post("/taskList/:id/task/:taskId", removeFromTaskListController);
router.put("/taskList/:id/task/:taskId", updateTaskController);
router.delete("/taskList", removeTaskListController);

module.exports = router;