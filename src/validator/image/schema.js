const Joi = require('joi');

const SummaryPayloadSchema = Joi.object({
  id_user : Joi.string().required(),
  summary : Joi.string().required(),
  summary_humidity : Joi.string().required(),
  summary_temperature : Joi.string().required(),
  summary_ldr : Joi.string().required(),
  summary_flame : Joi.string().required(),
  summary_mq : Joi.string().required()
});

module.exports = { SummaryPayloadSchema };