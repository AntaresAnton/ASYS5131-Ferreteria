
const app = require("./app");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// Define las opciones de Swagger
// Middleware para servir la documentación generada por Swagger

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
