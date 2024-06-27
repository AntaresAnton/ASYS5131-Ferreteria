const CustomError = require('./error').CustomError;

function validateCreditInput(buyOrder, sessionId, amount, returnUrl) {
  if (!buyOrder || !sessionId || !amount || !returnUrl) {
    throw new CustomError('Missing required fields', 400);
  }
  if (typeof amount !== 'number' || amount <= 0) {
    throw new CustomError('Invalid amount', 400);
  }
  // Add more specific validations as needed
}

function validateToken(token) {
  if (!token) {
    throw new CustomError('Token not provided', 400);
  }
}

module.exports = {
  validateCreditInput,
  validateToken
};
