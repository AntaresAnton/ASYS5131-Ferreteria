const express = require('express');
const router = express.Router();
import { usermethods as userController } from "../controllers/usuarios.controller";
// Rutas relacionadas con usuarios
router.get("/usuarios", (req, res) => {
    userController.getUser(req, res);
});

// Más rutas relacionadas con usuarios...
router.get("/usuarioejemplo", userController.ejemploUserPaginado); // http://localhost:3000/usuarioejemplo?page=1
// METODO POST
router.post("/usuario", userController.addUsuario); // http://localhost:3000/usuario
// METODO PUT
router.put("/usuario", userController.updateUsuario); // http://localhost:3000/usuario
// METODO DELETE
router.delete("/usuario", userController.deleteUsuario); // http://localhost:3000/usuario

module.exports = router;
