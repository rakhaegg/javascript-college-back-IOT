const Joi = require('joi');

const ImagePayloadSchema = Joi.object({
  image : Joi.string().required()

});

module.exports = { ImagePayloadSchema };