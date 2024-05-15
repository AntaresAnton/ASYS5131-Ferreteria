const express = require('express');
const router = express.Router();

// Aquí puedes definir más rutas y documentarlas según la estructura del ejemplo anterior
// Ruta de ejemplo con parámetros
/**
 * @swagger
 * /saludo:
 *   get:
 *     summary: Saludar
 *     description: Retorna un saludo personalizado
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Nombre de la persona a saludar
 *     responses:
 *       200:
 *         description: Saludo exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Saludo personalizado
 */
router.get('/saludo', (req, res) => {
    const nombre = req.query.nombre || 'amigo'; // Nombre por defecto si no se proporciona
    res.json({ message: `¡Hola, ${nombre}! Esta es una API de ejemplo.` });
  });
  
  // Otra ruta con diferentes parámetros
  /**
   * @swagger
   * /otra-ruta:
   *   post:
   *     summary: Otra Ruta
   *     description: Ejemplo de otra ruta con parámetros
   *     parameters:
   *       - in: body
   *         name: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             parametro1:
   *               type: string
   *               description: Descripción del parámetro 1
   *             parametro2:
   *               type: integer
   *               description: Descripción del parámetro 2
   *     responses:
   *       200:
   *         description: Respuesta exitosa
   *       400:
   *         description: Error en la solicitud
   */
  router.post('/otra-ruta', (req, res) => {
    // Procesar la solicitud con los parámetros proporcionados en el cuerpo
  });

module.exports = router;
