const crypto = require("crypto");
const { DEFAULT_STATUS } = require("../constant/constant");

class Tasks {
  constructor(task) {
    this.taskId = crypto.randomBytes(20).toString("hex");
    this.task = task;
    this.status = DEFAULT_STATUS;
  }
  getTaskId() {
    return this.taskId;
  }
  getTask() {
    return this.task;
  }
  getTaskStatus() {
    return this.status;
  }
}

module.exports.Tasks = Tasks;
