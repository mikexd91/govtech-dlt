exports.InternalServerError = class InternalServerError extends Error {
  constructor(error) {
    super();
    this.name = this.constructor.name;
    this.description = 'INTERNAL_SERVER_ERROR';
    this.message = error.message || 'Generic Internal Server Error';
    this.code = 500;
  }
};
