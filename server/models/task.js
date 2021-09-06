/* eslint-disable class-methods-use-this */
const crypto = require('crypto');
const { DEFAULT_STATUS, LOW_PRIORITY } = require('../constant/constant');

/**
 * @typedef Task
 * @property {string} id
 * @property {string} task task.required  - taskTitle
 * @property {enum} priority priority - eg: HIGH PRIORITY, MEDIUM PRIORITY, LOW PRIORITY
 * @property {enum} status status - eg: NOT DONE, IN PROGRESS, UNDER REVIEW, BLOCKED, DONE,
 * @property {string} dueDate dueDate - format DD-MM-YYYY,
 */
class Tasks {
  constructor(task, priority, dueDate) {
    this.taskId = crypto.randomBytes(20).toString('hex');
    this.task = task;
    this.priority = priority || LOW_PRIORITY; // default low priority
    this.status = DEFAULT_STATUS;
    this.dueDate = dueDate || 'null';
  }

  getTaskId() {
    return this.taskId;
  }

  getTask() {
    return this.isPrivate ? '' : this.task;
  }

  getTaskStatus() {
    return this.status;
  }

  getTaskPriority() {
    return this.priority;
  }

  getTaskDueDates() {
    return this.dueDate;
  }
}

module.exports.Tasks = Tasks;
