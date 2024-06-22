/**
 * @fileoverview Servicio para manejar errores HTTP y registrarlos.
 * @author Johanna Hernández
 * @author Zaida König
 * @author Patricio Quintanilla
 */

/**
 * Maneja errores HTTP y los registra
 * @param {Object} res - Objeto de respuesta Express
 * @param {string} message - Mensaje de error para el cliente
 * @param {Error|string} error - Error original o mensaje de error
 * @param {number} [statusCode=500] - Código de estado HTTP (por defecto 500)
 * @throws {Error} Si el objeto de respuesta es inválido o el mensaje no es una cadena
 */
const httpError = (res, message, error, statusCode = 500) => {
  if (!res || typeof res.status !== 'function' || typeof res.json !== 'function') {
    throw new Error('Invalid response object');
  }

  if (typeof message !== 'string') {
    throw new Error('Message must be a string');
  }

  const errorMessage = error instanceof Error ? error.message : String(error);

  // Registrar el error
  console.error(`${message}: ${errorMessage}`);

  // Estructura de error estandarizada
  const errorResponse = {
    status: 'error',
    message,
    details: errorMessage
  };

  res.status(statusCode).json(errorResponse);
};

module.exports = { tx, httpError };



// services/transbankService.js
// const tx = {
//     create: jest.fn(),
//     status: jest.fn(),
//     commit: jest.fn()
//   };
  
//   const httpError = (res, message, error) => {
//     res.status(500).json({ message, error: error.message });
//   };
  
//   module.exports = { tx, httpError };
  