/**
 * Configuración de la base de datos
 *
 * Este módulo carga las variables de entorno y proporciona la configuración
 * necesaria para la conexión a la base de datos. Utiliza valores por defecto
 * en caso de que las variables de entorno no estén definidas.
 *
 * Variables de entorno requeridas:
 * - HOST: dirección del servidor de la base de datos
 * - DATABASE: nombre de la base de datos
 * - USER: nombre de usuario para la conexión
 * - PASSWORD: contraseña para la conexión
 */

const dotenv = require("dotenv");
dotenv.config();

const { HOST, DATABASE, USER, PASSWORD } = process.env;

const configuracionDB = {
  host: HOST || "localhost",
  database: DATABASE || "mi_base_de_datos",
  user: USER || "usuario_por_defecto",
  password: PASSWORD || "",
};

// Validación básica
Object.entries(configuracionDB).forEach(([clave, valor]) => {
  if (!valor && clave !== "password") {
    console.warn(
      `Advertencia: La configuración para '${clave}' no está definida.`
    );
  }
});

module.exports = configuracionDB;
