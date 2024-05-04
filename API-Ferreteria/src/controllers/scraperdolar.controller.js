const axios = require('axios');
const mysql = require('mysql');

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'recetas_del_mundo'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// URL de la API a scrapear
const apiUrl = 'https://mindicador.cl/api';

// Función para realizar el scraping y guardar en la base de datos
async function scrapeAndSave() {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Aquí puedes procesar los datos de la API y guardarlos en la base de datos
    // En este ejemplo, vamos a guardar el valor del dólar y la UF

    const dolarValue = data.dolar.valor;
    // const ufValue = data.uf.valor;

    // Insertar los valores en la base de datos
    const query = `UPDATE divisas SET valor = ? WHERE divisas.codigo_divisa = 'USD'`;
    const values = [
      [dolarValue],
    //   ['uf', ufValue]
    ];

    connection.query(query, [values], (err, result) => {
      if (err) {
        console.error('Error al insertar en la base de datos: ', err);
        return;
      }
      console.log('Datos insertados correctamente');
      // Cierra la conexión después de insertar los datos
      connection.end();
    });
  } catch (error) {
    console.error('Error al obtener datos de la API: ', error);
    // Cierra la conexión en caso de error
    connection.end();
  }
}

// Ejecutar la función para hacer el scraping y guardar en la base de datos
scrapeAndSave();
