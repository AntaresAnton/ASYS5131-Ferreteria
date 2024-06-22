/**
 * @fileoverview Módulo de conexión a la base de datos.
 * @description Este módulo proporciona funciones para establecer y gestionar
 * la conexión a la base de datos MySQL utilizando Sequelize.
 * @author Johanna Hernández - Zaida König - Patricio Quintanilla
 * @version 1.0
 */

import { Sequelize } from 'sequelize';
import claves from './../config';

// Configuración de Sequelize
const sequelize = new Sequelize(claves.database, claves.user, claves.password, {
  host: claves.host,
  dialect: 'mysql',
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
    console.error('No se pudo conectar a la base de datos:', error);
    throw new Error('Error al conectar con la base de datos');
  }
};

export {
  getConnection,
  sequelize
};
