// ------- HTTP Error Base classes -------

exports.BadRequestError = class BadRequestError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.description = "BAD_REQUEST";
    this.message = message || "Generic Bad Request Error";
    this.code = 400;
  }
};

exports.InternalServerError = class InternalServerError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.description = "INTERNAL_SERVER_ERROR";
    this.message = message || "Generic Internal Server Error";
    this.code = 500;
  }
};

exports.ValidationError = class ValidationError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.description = "BAD_REQUEST";
    this.message = message || "Validation error on the request body parameters";
    this.code = 400;
  }
};
