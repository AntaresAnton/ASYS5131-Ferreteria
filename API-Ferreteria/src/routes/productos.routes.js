const express = require('express');
const router = express.Router();
import { products as productosController } from "../controllers/productos.controller";
// Rutas relacionadas con productos
/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retorna todos los productos disponibles.
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del producto
 *                   nombre:
 *                     type: string
 *                     description: Nombre del producto
 *                   precio:
 *                     type: number
 *                     description: Precio del producto en la moneda local
 *                   precio_en_dolares:
 *                     type: string
 *                     description: Precio del producto en dólares
 *                   valor_dolar_dia:
 *                     type: string
 *                     description: Valor del dólar en el día de la actualización
 *                   dolar_actualizado:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora de la última actualización del valor del dólar
 */
router.get('/productos', (req, res) => {
    // Lógica para obtener todos los productos
    productosController.obtenerProducto(req, res);
});

router.get('/productos/:id', (req, res) => {
    // Lógica para obtener un producto por ID
});
// Más rutas relacionadas con productos...

module.exports = router;
