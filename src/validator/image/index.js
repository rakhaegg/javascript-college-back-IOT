
const InvariantError = require('../../exception/InvariantError');
const { ImagePayloadSchema } = require('./schema');

const ImageValidator = {
  validateImagePayload: (payload) => {
    const validationResult = ImagePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ImageValidator;
