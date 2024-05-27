const swaggerUi = require("swagger-ui-express");
const app = require("./app");
const bodyParser = require("body-parser");
import swaggerDocument from './swagger/swagger.json';
app.use(bodyParser.json());
// Define las opciones de Swagger
// Middleware para servir la documentación generada por Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Puerto de escucha
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
