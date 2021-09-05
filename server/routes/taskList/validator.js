const Joi = require("joi").extend(require("@joi/date"));
const forOwn = require("lodash/forOwn");
const {
  DONE_STATUS,
  DEFAULT_STATUS,
  IN_PROGRESS_STATUS,
  BLOCKED_STATUS,
  UNDER_REVIEW_STATUS,
  LOW_PRIORITY,
  MEDIUM_PRIORITY,
  HIGH_PRIORITY,
} = require("../../constant/constant");
const respond = require("../../utils/response-util"); // Used for giving standardized responses
const { ValidationError } = require("../../utils/response-util/httpErrorTypes");

// Exported Method Description: Validates whether the incoming request body fulfils certain conditions.
module.exports.validateAddTaskReq = (req, res, next) => {
  try {
    validateAddTaskRequestBody(req.body); // Validate Request Body
    next();
  } catch (error) {
    respond.failure(res, new ValidationError(error));
  }
};

function validateAddTaskRequestBody(body) {
  const schema = Joi.object().keys({
    taskTitle: Joi.string().required(),
    priority: Joi.string()
      .valid(LOW_PRIORITY, MEDIUM_PRIORITY, HIGH_PRIORITY)
      .optional(),
    dueDate: Joi.date().format("DD-MM-YYYY").optional(),
  });
  const validation = schema.validate(body);

  if (validation.error) throw new Error(validation.error);
}
