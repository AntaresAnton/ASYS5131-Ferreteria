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

// Configurar el logger Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Configuración de la conexión a la base de datos usando variables de entorno
const dbConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10 // Límite de conexiones en el pool
};

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para obtener una conexión del pool
async function obtenerConexion() {
  try {
    const conexion = await pool.getConnection();
    logger.info("Conexión obtenida del pool");
    return conexion;
  } catch (err) {
    logger.error("Error al obtener conexión del pool:", err);
    throw err;
  }
}

// Función para liberar una conexión de vuelta al pool
async function liberarConexion(conexion) {
  try {
    conexion.release();
    logger.info("Conexión liberada al pool");
  } catch (err) {
    if (err instanceof mysql.Error) {
      logger.error("Error MySQL al liberar la conexión:", err);
    } else {
      logger.error("Error desconocido al liberar la conexión:", err);
    }
  }
}

// Función para cerrar el pool de conexiones (usar al finalizar la aplicación)
async function cerrarPool() {
  try {
    await pool.end();
    logger.info("Pool de conexiones cerrado");
  } catch (err) {
    if (err instanceof mysql.Error) {
      logger.error("Error MySQL al cerrar el pool de conexiones:", err);
    } else {
      logger.error("Error desconocido al cerrar el pool de conexiones:", err);
    }
  }
}

module.exports = { obtenerConexion, liberarConexion, cerrarPool };
