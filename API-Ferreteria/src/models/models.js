// Importa Sequelize y configura tu conexión a la base de datos
const Sequelize = require('sequelize');
const sequelize = new Sequelize('ferremas', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define el modelo Producto
const Producto = sequelize.define('producto', {
  // Define las columnas de tu tabla 'productos'
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // Añade más columnas según sea necesario
});

// Sincroniza el modelo con la base de datos
(async () => {
  await sequelize.sync();
  console.log('Modelo Producto sincronizado con la base de datos.');
})();

// Exporta el modelo para que pueda ser utilizado en otros archivos
module.exports = { Producto };
