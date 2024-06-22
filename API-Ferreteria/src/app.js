/**
 * Archivo Principal de la API-Ferretería
 *
 * Este archivo configura la aplicación Express para el proyecto API-Ferretería.
 * Establece middleware, rutas y documentación Swagger.
 * La API maneja la gestión de productos y la integración con Transbank para una ferretería.
 */

// Importaciones de rutas
const productosRoutes = require("./routes/productos.routes");
const transbankRoutes = require("./routes/transbank.routes");

// Importaciones de dependencias
const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const helmet = require("helmet"); // Nueva importación para seguridad
import swaggerDocument from "./swagger/swagger.json";

// Inicialización de Express
const router = express();

// Configuración
router.set("port", 3000);

// Middleware
router.use(morgan("dev")); // Logging
router.use(cors()); // Habilitar CORS
router.use(express.json()); // Parseo de JSON
router.use(express.static("public")); // Servir archivos estáticos
router.use(helmet()); // Seguridad adicional

// Rutas
router.use("/", productosRoutes);
router.use("/transbank", transbankRoutes);

// Documentación Swagger
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Manejador de rutas no encontradas (404)
router.use((req, res, next) => {
  res.status(404).send("Revisar /api-docs para mayor información");
});

module.exports = router;
