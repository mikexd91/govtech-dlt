const Joi = require('joi').extend(require('@joi/date'));

const {
  LOW_PRIORITY,
  MEDIUM_PRIORITY,
  HIGH_PRIORITY,
} = require('../../constant/constant');
const respond = require('../../utils/response-util'); // Used for giving standardized responses
const { ValidationError } = require('../../utils/response-util/ValidationError');

function validateAddTaskRequestBody(body) {
  const schema = Joi.object().keys({
    taskTitle: Joi.string().required(),
    isPrivate: Joi.boolean().required(),
    priority: Joi.string()
      .valid(LOW_PRIORITY, MEDIUM_PRIORITY, HIGH_PRIORITY)
      .optional(),
    dueDate: Joi.date().format('DD-MM-YYYY').optional(),
  });
  const validation = schema.validate(body);

  if (validation.error) throw new Error(validation.error);
}

module.exports.validateAddTaskReq = (req, res, next) => {
  try {
    validateAddTaskRequestBody(req.body); // Validate Request Body
    next();
  } catch (error) {
    respond.failure(res, new ValidationError(error));
  }
};
