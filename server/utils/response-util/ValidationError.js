exports.ValidationError = class ValidationError extends Error {
  constructor(error) {
    super();
    this.name = this.constructor.name;
    this.description = 'VALIDATION_ERROR';
    this.message = error.message || 'Validation error on the request body parameters';
    this.code = 400;
  }
};
