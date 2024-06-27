class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

function handleError(res, error) {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    ok: false,
    message: error.message || 'Internal server error'
  });
}

module.exports = {
  CustomError,
  handleError
};
