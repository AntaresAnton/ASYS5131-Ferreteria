/**
 * Módulo de Conexión a la Base de Datos
 * 
 * Este módulo establece una conexión a una base de datos MySQL utilizando un pool de conexiones.
 * Utiliza un enfoque basado en promesas para un mejor manejo asíncrono e incluye una gestión
 * adecuada de errores y cierre de conexión.
 * 
 * El módulo exporta funciones para obtener una conexión del pool y para liberar una conexión.
 * Está diseñado para ser robusto, seguro y mantenible, con un manejo de errores mejorado
 * y capacidades de registro avanzadas.
 */

const mysql = require("mysql2/promise");
const winston = require('winston');

// Configurar el logger Winston con formato JSON
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Validar variables de entorno
const requiredEnvVars = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    logger.error(`Variable de entorno ${envVar} no está definida`);
    process.exit(1);
  }
}

// Configuración de la conexión a la base de datos usando variables de entorno
const dbConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10, // Límite de conexiones en el pool
  connectTimeout: 10000, // 10 segundos de timeout para la conexión
};

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig);

// Agregar manejadores de eventos al pool
pool.on('connection', (connection) => logger.info('Nueva conexión establecida'));
pool.on('release', (connection) => logger.info('Conexión liberada'));
pool.on('error', (err) => logger.error('Error inesperado en el cliente inactivo', { error: err }));

// Función para validar la conexión
async function validarConexion(conexion) {
  await conexion.query('SELECT 1');
}

// Función para obtener una conexión del pool
async function obtenerConexion() {
  try {
    const conexion = await pool.getConnection();
    logger.info("Conexión obtenida del pool");
    await validarConexion(conexion);
    return conexion;
  } catch (err) {
    logger.error("Error al obtener conexión del pool:", { error: err });
    throw err;
  }
}

// Función para liberar una conexión de vuelta al pool
async function liberarConexion(conexion, throwError = false) {
  try {
    conexion.release();
    logger.info("Conexión liberada al pool");
  } catch (err) {
    const errorMessage = err.code 
      ? `Error MySQL (${err.code}) al liberar la conexión: ${err.message}`
      : `Error desconocido al liberar la conexión: ${err}`;
    logger.error(errorMessage);
    if (throwError) throw err;
  }
}

// Función para cerrar el pool de conexiones (usar al finalizar la aplicación)
async function cerrarPool() {
  try {
    await pool.end();
    logger.info("Pool de conexiones cerrado");
  } catch (err) {
    const errorMessage = err.code 
      ? `Error MySQL (${err.code}) al cerrar el pool de conexiones: ${err.message}`
      : `Error desconocido al cerrar el pool de conexiones: ${err}`;
    logger.error(errorMessage);
    throw err;
  }
}

// Función para el cierre graceful de la aplicación
function cierreGraceful() {
  logger.info("Iniciando cierre graceful...");
  cerrarPool().then(() => {
    logger.info("Cierre graceful completado");
    process.exit(0);
  }).catch((err) => {
    logger.error("Error durante el cierre graceful:", { error: err });
    process.exit(1);
  });
}

// Manejar señales de terminación
process.on('SIGINT', cierreGraceful);
process.on('SIGTERM', cierreGraceful);

module.exports = { obtenerConexion, liberarConexion, cerrarPool };
