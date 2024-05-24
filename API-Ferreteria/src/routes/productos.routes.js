const express = require('express');
const router = express.Router();
import { products as productosController } from "../controllers/productos.controller";
/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retosrna todos los productos disponibles.
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

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Retorna un producto específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a obtener
 *         schema:
 *           type: integer
 *           format: int32  # Esto aclara que se espera un entero de 32 bits
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 */


router.get('/productos/:id', (req, res) => {
    // Lógica para obtener un producto por ID
    productosController.productoPorID(req,res);
});


router.post('/add-producto', (req, res) => {
    // Lógica para obtener un producto por ID
    productosController.postProducto(req,res);
});



module.exports = router;
