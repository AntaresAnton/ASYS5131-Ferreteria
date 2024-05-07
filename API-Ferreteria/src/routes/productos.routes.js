const express = require('express');
const router = express.Router();
import { products as productosController } from "../controllers/productos.controller";


// Rutas relacionadas con productos
router.get('/productos', (req, res) => {
    // Lógica para obtener todos los productos
    productosController.obtenerProducto(req, res);
});
router.get('/productos/:id', (req, res) => {
    // Lógica para obtener un producto por ID
});
// Más rutas relacionadas con productos...

module.exports = router;
