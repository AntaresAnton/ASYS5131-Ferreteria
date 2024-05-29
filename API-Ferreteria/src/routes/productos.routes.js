const express = require("express");
const router = express.Router();
import { products as productosController } from "../controllers/productos.controller";

router.get("/productos", (req, res) => {
  // Lógica para obtener todos los productos
  productosController.obtenerProducto(req, res);
});
router.get("/productos/:id", (req, res) => {
  // Lógica para obtener un producto por ID
  productosController.productoPorID(req, res);
});
router.get("/productos/nombre/:nombre", productosController.productoPorNombre);

router.get("/divisas", productosController.getDivisas)

module.exports = router;