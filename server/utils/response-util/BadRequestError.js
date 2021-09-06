exports.BadRequestError = class BadRequestError extends Error {
  constructor(error) {
    super();
    this.name = this.constructor.name;
    this.description = 'BAD_REQUEST';
    this.message = error.message || 'Generic Bad Request Error';
    this.code = 400;
  }
};
