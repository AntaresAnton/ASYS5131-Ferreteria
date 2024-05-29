"use strict";

var app = require("./app");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
// Define las opciones de Swagger
// Middleware para servir la documentación generada por Swagger

// Puerto de escucha
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Servidor corriendo en el puerto ".concat(PORT));
});