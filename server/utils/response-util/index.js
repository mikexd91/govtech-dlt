// ------- Logging Tools -------
const SIGNALE = require('signale'); // Used for more readable CLI Logging

// ---- Supporting Methods ----
const sendErrResponse = (res, error) => {
  console.log(error.message);
  res.status(error.code).send({
    status: {
      code: error.code,
      description: error.description,
    },
    data: error,
  });
};

const sendResponse = (res, code, description, data) => {
  res.status(code).send({
    status: {
      code,
      description,
    },
    data,
  });
};

// ---- Exported Methods ----
exports.success = (res, data) => sendResponse(res, 200, 'success', data);

exports.failure = (res, error) => {
  if (!process.env.DEBUG) {
    SIGNALE.error(error);
  }
  return sendErrResponse(res, error);
};
