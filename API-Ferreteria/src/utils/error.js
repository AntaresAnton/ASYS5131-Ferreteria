/**
 * @fileoverview Función de utilidad para manejar errores HTTP en la aplicación.
 * Este módulo proporciona una forma estandarizada de enviar respuestas de error con mensajes y códigos de estado personalizados.
 */

/**
 * Maneja errores HTTP enviando una respuesta JSON con un mensaje de error.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {string} mensaje - El mensaje de error que se enviará en la respuesta.
 * @param {number} [codigoEstado=400] - El código de estado HTTP (por defecto: 400).
 * @returns {Object} El objeto de respuesta JSON.
 * @throws {TypeError} Si el mensaje no es una cadena de texto.
 * @throws {RangeError} Si el codigoEstado no es un código de estado HTTP válido.
 */
export const httpError = (res, mensaje, codigoEstado = 400) => {
    if (typeof mensaje !== 'string') {
      throw new TypeError('El mensaje debe ser una cadena de texto');
    }
    if (!Number.isInteger(codigoEstado) || codigoEstado < 100 || codigoEstado > 599) {
      throw new RangeError('El codigoEstado debe ser un código de estado HTTP válido');
    }
  
    return res.status(codigoEstado).json({
      ok: false,
      mensaje
    });
  };
  