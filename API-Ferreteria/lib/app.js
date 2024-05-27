"use strict";

// Enrutado para algunas funciones en sus respectivos archivos de rutas
var productosRoutes = require("./routes/productos.routes");
// Dependencias que deben estar instaladas
var express = require("express");
var morgan = require("morgan");

// linkeo a variables, para que la url de swagger sea dinamica
// const getServerUrl = () => {
//     const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
//     const host = process.env.HOST || 'localhost';
//     const port = process.env.PORT || 3000;
//     return `${protocol}://${host}:${port}`;
//   };

// Inicializa Swagger-jsdoc
// Inicializa
var router = express(); //ejecuta express
var cors = require("cors");

// settings
router.set("port", 3000);
router.use(morgan("dev"));
// router.use(bodyParser.json());
router.use(cors()
// { origin: [getServerUrl(),] } no descomentar si está en production
);
// router.use(bodyParser.json());
router.use(express.json());
router.use(express["static"]('public')); // Asegúrate de tener una carpeta 'public' en tu proyecto

// routes
router.use("/", productosRoutes);
module.exports = router;