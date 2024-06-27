/**
 * @fileoverview Módulo de conexión a la base de datos.
 * @description Este módulo proporciona funciones para establecer y gestionar
 * la conexión a la base de datos MySQL utilizando Sequelize.
 * @author Johanna Hernández - Zaida König - Patricio Quintanilla
 * @version 1.1
 */

import { Sequelize } from 'sequelize';
import claves from './../config';

// Configuración de Sequelize con pool de conexiones
const sequelize = new Sequelize(claves.database, claves.user, claves.password, {
  host: claves.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: console.log // Puedes cambiar esto a false para desactivar el logging en producción
});

/**
 * Obtiene una conexión a la base de datos.
 * @async
 * @returns {Promise<Sequelize>} Una instancia de Sequelize autenticada.
 * @throws {Error} Si no se puede establecer la conexión.
 */
const getConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');
    return sequelize;
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error.message);
    throw new Error(`Error al conectar con la base de datos: ${error.message}`);
  }
};

/**
 * Cierra la conexión a la base de datos.
 * @async
 */
const closeConnection = async () => {
  try {
    await sequelize.close();
    console.log('Conexión cerrada correctamente.');
  } catch (error) {
    console.error('Error al cerrar la conexión:', error.message);
  }
};

// Manejar el cierre de la aplicación
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});

export {
  getConnection,
  sequelize,
  closeConnection
};
