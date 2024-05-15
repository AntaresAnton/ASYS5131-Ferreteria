const express = require('express');
const router = express.Router();
import { usermethods as userController } from "../controllers/usuarios.controller";
// Rutas relacionadas con usuarios
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener usuarios
 *     description: Retorna una lista de usuarios.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del usuario
 *                   nombre:
 *                     type: string
 *                     description: Nombre del usuario
 *                   correo:
 *                     type: string
 *                     description: Correo electrónico del usuario
 *                   rol:
 *                     type: string
 *                     description: Rol del usuario
 */
router.get('/usuarios', (req, res) => {
    userController.getUser(req, res);
});


// Más rutas relacionadas con usuarios...
/**
 * @swagger
 * /usuarioejemplo:
 *   get:
 *     summary: Obtener usuarios paginados
 *     description: Retorna una lista de usuarios paginados.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número de página a obtener
 *     responses:
 *       200:
 *         description: Lista de usuarios paginados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */

router.get("/usuarioejemplo", userController.ejemploUserPaginado); // http://localhost:3000/usuarioejemplo?page=1
// METODO POST
/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Agregar usuario
 *     description: Agrega un nuevo usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario agregado exitosamente
 *       400:
 *         description: Error en la solicitud
 */

router.post("/usuario", userController.addUsuario); // http://localhost:3000/usuario
// METODO PUT
/**
 * @swagger
 * /usuario:
 *   put:
 *     summary: Actualizar usuario
 *     description: Actualiza los datos de un usuario existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en la solicitud
 */

router.put("/usuario", userController.updateUsuario); // http://localhost:3000/usuario
// METODO DELETE
/**
 * @swagger
 * /usuario:
 *   delete:
 *     summary: Eliminar usuario
 *     description: Elimina un usuario existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       400:
 *         description: Error en la solicitud
 */

router.delete("/usuario", userController.deleteUsuario); // http://localhost:3000/usuario

module.exports = router;
