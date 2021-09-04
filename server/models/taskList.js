const crypto = require("crypto");
const { Task } = require("./task");

class TaskList {
  constructor() {
    this.taskList = {
      id: crypto.randomBytes(20).toString("hex"),
      tasks: [],
    };
  }
  getTaskList() {
    return this.taskList;
  }
}

module.exports.TaskList = TaskList;
