// import mysql from "promise-mysql";
// const claves  = require('./../config');

// const connection = mysql.createConnection({
//     host: claves.host,
//     database: claves.database,
//     user: claves.user,
//     password: claves.password
// });

// const getConnection = async () => {
//     return connection;
// }

// module.exports = {
//     getConnection
// }

const { Sequelize } = require("sequelize");
const claves = require("./../config");
// const mysql = require('mysql2/promise');
const mysql = require("promise-mysql");

// Configuración de Sequelize
const sequelize = new Sequelize(claves.database, claves.user, claves.password, {
  host: claves.host,
  dialect: "mysql",
});

// Definición del modelo de conexión
// const Connection = sequelize.define('Connection');

// Función para obtener la conexión
const getConnection = async () => {
  try {
    // Autenticar la conexión
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");
    return sequelize;
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    throw error;
  }
};

// Exportar la función de conexión
module.exports = {
  getConnection,
  sequelize,
  // Connection,
};
