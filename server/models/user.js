const crypto = require('crypto');

/**
 * @typedef User
 * @property {string} id user id
 * @property {string} name username
 * @property {Array<string>} friends friends
 */
class User {
  constructor(name, taskListId) {
    this.id = crypto.randomBytes(20).toString('hex');
    this.name = name;
    this.taskListId = taskListId;
    this.friends = [];
  }

  getId() {
    return this.id;
  }

  getTaskListId() {
    return this.taskListId;
  }

  getName() {
    return this.name;
  }

  getFriends() {
    return this.friends;
  }
}

module.exports.User = User;
