const express = require("express");
const router = express.Router();
const { products: productosController } = require("../controllers/productos.controller");

// Middleware para manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
};

router.get("/productos", (req, res, next) => {
  try {
    productosController.obtenerProducto(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/productos/:id", (req, res, next) => {
  try {
    productosController.productoPorID(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/productos/nombre/:nombre", (req, res, next) => {
  try {
    productosController.productoPorNombre(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/divisas", (req, res, next) => {
  try {
    productosController.getDivisas(req, res);
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);

module.exports = router;
