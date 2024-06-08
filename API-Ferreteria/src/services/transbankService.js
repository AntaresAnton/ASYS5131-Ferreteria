// services/transbankService.js
const tx = {
    create: jest.fn(),
    status: jest.fn(),
    commit: jest.fn()
  };
  
  const httpError = (res, message, error) => {
    res.status(500).json({ message, error: error.message });
  };
  
  module.exports = { tx, httpError };
  