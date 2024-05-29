// Enrutado para algunas funciones en sus respectivos archivos de rutas
const productosRoutes = require("./routes/productos.routes");
// Dependencias que deben estar instaladas
const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
import swaggerDocument from './swagger/swagger.json';
const transbankRoutes = require('./routes/transbank.routes');

// linkeo a variables, para que la url de swagger sea dinamica
// const getServerUrl = () => {
//     const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
//     const host = process.env.HOST || 'localhost';
//     const port = process.env.PORT || 3000;
//     return `${protocol}://${host}:${port}`;
//   };

// Inicializa Swagger-jsdoc
// Inicializa
const router = express(); //ejecuta express
const cors = require("cors");

// settings
router.set("port", 3000);
router.use(morgan("dev"));
// router.use(bodyParser.json());
router.use(
  cors()
  // { origin: [getServerUrl(),] } no descomentar si está en production
);
// router.use(bodyParser.json());
router.use(express.json());
router.use(express.static('public')); // Asegúrate de tener una carpeta 'public' en tu proyecto
router.use("/", productosRoutes);
router.use('/transbank', transbankRoutes);
// routes
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta para manejar todas las demás solicitudes no definidas - siempre dejar de los ultimos
router.use((req, res, next) => {
  res.status(404).send('Revisar /api-docs para mayor información');
});
module.exports = router;
