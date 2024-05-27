const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = require('./app'); // Importa tu aplicación Express desde app.js
const bodyParser = require('body-parser');
// Define las opciones de Swagger
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Ferremax',
        version: '1.0.0',
        description: 'API de Ferretería realizada con Swagger y Express',
      },
      servers: [
        {
          url: 'http://localhost:4000/',
        },
      ],
    },
    apis: ['./src/routes/*.js'], // Rutas de archivos que contienen las definiciones de la API
  };

// Inicializa Swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
app.use(bodyParser.json());
// Middleware para servir la documentación generada por Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Puerto de escucha
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
