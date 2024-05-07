const express = require('express');
const router = express.Router();
import { pedidos as pedidosController } from "../controllers/pedidos.controller";
// Rutas relacionadas con usuarios
router.get("/pedidos", (req, res) => {
    pedidosController.getPedido(req, res);
});

module.exports = router;