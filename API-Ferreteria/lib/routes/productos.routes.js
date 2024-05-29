"use strict";

var _productos = require("../controllers/productos.controller");
var express = require("express");
var router = express.Router();
router.get("/productos", function (req, res) {
  // Lógica para obtener todos los productos
  _productos.products.obtenerProducto(req, res);
});
router.get("/productos/:id", function (req, res) {
  // Lógica para obtener un producto por ID
  _productos.products.productoPorID(req, res);
});
router.get("/productos/nombre/:nombre", _productos.products.productoPorNombre);
router.get("/divisas", _productos.products.getDivisas);
module.exports = router;