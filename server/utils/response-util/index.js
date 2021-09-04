// ------- Logging Tools -------
const SIGNALE = require("signale"); // Used for more readable CLI Logging
const {
  ValidationError,
  BadRequestError,
  InternalServerError,
} = require("./httpErrorTypes");
// ---- Exported Methods ----

exports.success = (res, data) => {
  return sendResponse(res, 200, "success", data);
};

exports.failure = (res, error) => {
  if (!process.env.DEBUG) {
    SIGNALE.error(error);
  }
  switch (error.name) {
    case "ValidationError":
      const validationError = new ValidationError();
      return sendErrResponse(res, validationError);
    case "BadRequestError":
      const badRequestError = new BadRequestError();
      return sendErrResponse(res, badRequestError);
    default:
      const internalServerError = new InternalServerError();
      return sendErrResponse(res, internalServerError);
  }
};

// ---- Supporting Methods ----
const sendErrResponse = (res, error) => {
  res.status(error.code).send({
    status: {
      code: error.code,
      description: error.description,
    },
    data: error.message,
  });
};

const sendResponse = (res, code, description, data) => {
  res.status(code).send({
    status: {
      code: code,
      description: description,
    },
    data: data,
  });
};
