"use strict";

// Objetivo: Manejar los errores de la aplicación
var httpError = function httpError(res, msj) {
  var estado = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;
  return res.status(estado).json({
    "ok": false,
    "msj": msj
  });
};
// Exportamos la funcion
module.exports = {
  httpError: httpError
};