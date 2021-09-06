const crypto = require('crypto');

/**
 * @typedef TaskList
 * @property {string} id
 * @property {Array.<Task>} tasks.required - Contains array of Tasks object
 */
class TaskList {
  constructor() {
    this.taskList = {
      id: crypto.randomBytes(20).toString('hex'),
      publicTasks: [],
      privateTasks: [],
    };
  }

  getTaskList() {
    return this.taskList;
  }
}

module.exports.TaskList = TaskList;
