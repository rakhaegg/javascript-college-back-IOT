
const InvariantError = require('../../exception/InvariantError');
const { SummaryPayloadSchema } = require('./schema');

const SummaryValidator = {
  validateSummaryPayload: (payload) => {
    const validationResult = SummaryPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SummaryValidator;
