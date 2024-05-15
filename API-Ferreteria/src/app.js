// Enrutado para algunas funciones en sus respectivos archivos de rutas
const LanguageRoutes = require('./routes/recetas.routes');
const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const swaggerRoutes = require('./routes/swagger.routes');
// Dependencias que deben estar instaladas
const express = require('express')
const morgan = require('morgan')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// linkeo a variables, para que la url de swagger sea dinamica
// const getServerUrl = () => {
//     const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
//     const host = process.env.HOST || 'localhost';
//     const port = process.env.PORT || 3000;
//     return `${protocol}://${host}:${port}`;
//   };
// Define las opciones de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Ferremas',
      version: '1.0.0',
      description: 'API de Ferretería realizada con Swagger y Express',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
      },
    ],
  },
  apis: ['./routes/*.routes.js'], // Rutas de archivos que contienen las definiciones de la API
};

  // Inicializa Swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
// Inicializa
const app = express(); //ejecuta express
const cors = require('cors')
// settings
app.set("port", 3000);
app.use(morgan("dev"));
app.use(cors(
    // { origin: [getServerUrl(),] } no descomentar si está en production
));
app.use(express.json());
// MIDDLEWARES
// Middleware para servir la documentación generada por Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// routes
app.use("/", LanguageRoutes)
app.use("/", productosRoutes)
app.use("/", usuariosRoutes)
app.use("/", pedidosRoutes)
app.use("/", swaggerRoutes)

module.exports = app