// ------- HTTP Error Base classes -------

exports.BadRequestError = class BadRequestError extends Error {
  constructor(error) {
    super();
    this.name = this.constructor.name;
    this.description = "BAD_REQUEST";
    this.message = error.message || "Generic Bad Request Error";
    this.code = 400;
  }
};

exports.InternalServerError = class InternalServerError extends Error {
  constructor(error) {
    super();
    this.name = this.constructor.name;
    this.description = "INTERNAL_SERVER_ERROR";
    this.message = error.message || "Generic Internal Server Error";
    this.code = 500;
  }
};

exports.ValidationError = class ValidationError extends Error {
  constructor(error) {
    super();
    this.name = this.constructor.name;
    this.description = "VALIDATION_ERROR";
    this.message =
      error.message || "Validation error on the request body parameters";
    this.code = 400;
  }
};
