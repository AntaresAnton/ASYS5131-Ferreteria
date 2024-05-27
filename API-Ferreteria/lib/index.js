"use strict";

var _swagger = _interopRequireDefault(require("./swagger/swagger.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var swaggerUi = require("swagger-ui-express");
var app = require("./app");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
// Define las opciones de Swagger
// Middleware para servir la documentación generada por Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(_swagger["default"]));

// Puerto de escucha
var PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log("Servidor corriendo en el puerto ".concat(PORT));
});