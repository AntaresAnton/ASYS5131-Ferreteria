/**
 * API-Ferreteria - Archivo Principal del Servidor
 * 
 * Este archivo inicializa y configura el servidor Express para el proyecto API-Ferreteria.
 * Establece el middleware necesario, define las rutas de la API y arranca el servidor.
 * El servidor está configurado para usar variables de entorno para una implementación flexible
 * e incluye manejo de errores y capacidades de cierre graceful.
 */

const app = require("./app");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Variables de entorno
const PORT = process.env.PORT || 3000;

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}).on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
  process.exit(1);
});

// Cierre graceful
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido. Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado.');
    process.exit(0);
  });
});

// Aquí irían las definiciones de rutas y otros middlewares específicos de la API