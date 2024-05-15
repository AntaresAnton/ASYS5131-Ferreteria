const express = require('express');
const router = express.Router();
import { pedidos as pedidosController } from "../controllers/pedidos.controller";
// Rutas relacionadas con usuarios
/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Obtener pedidos
 *     description: Retorna una lista de pedidos.
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del pedido
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
router.get('/pedidos', (req, res) => {
    pedidosController.getPedido(req, res);
});


module.exports = router;