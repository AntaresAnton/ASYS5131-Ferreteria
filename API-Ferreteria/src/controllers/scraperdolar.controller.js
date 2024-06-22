/**
 * Módulo de Conexión a la Base de Datos
 * 
 * Este módulo establece una conexión a una base de datos MySQL utilizando la configuración
 * proporcionada en el objeto 'claves'. Utiliza un enfoque basado en promesas para un mejor
 * manejo asíncrono e incluye una gestión adecuada de errores y cierre de conexión.
 * 
 * El módulo exporta una función asíncrona que puede ser utilizada para obtener una conexión
 * a la base de datos. Está diseñado para ser más robusto y mantenible, con un manejo de
 * errores mejorado y capacidades de registro mejoradas.
 */

const mysql = require("mysql2/promise");
const claves = require("./../config");
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

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: claves.host,
  database: claves.database,
  user: claves.user,
  password: claves.password,
};

// Función asíncrona para obtener la conexión a la base de datos
async function obtenerConexion() {
  try {
    const conexion = await mysql.createConnection(dbConfig);
    logger.info("Conexión a la base de datos establecida");
    return conexion;
  } catch (err) {
    logger.error("Error al conectar a la base de datos:", err);
    throw err; // Re-lanzar el error para manejo de errores de nivel superior
  }
}

// Función para cerrar la conexión a la base de datos
async function cerrarConexion(conexion) {
  try {
    await conexion.end();
    logger.info("Conexión a la base de datos cerrada");
  } catch (err) {
    logger.error("Error al cerrar la conexión a la base de datos:", err);
  }
}

module.exports = { obtenerConexion, cerrarConexion };
