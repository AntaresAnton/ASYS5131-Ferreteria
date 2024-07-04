const scrapeAndSave = require('../src/controllers/scraperdolar.controller');
const { obtenerConexion, liberarConexion } = require('../src/database/database');

describe('scrapeAndSave', () => {
  let conexion;

  beforeAll(async () => {
    conexion = await obtenerConexion();
    await conexion.query('TRUNCATE TABLE divisas'); // Limpiar la tabla divisas antes de la prueba
  });

  afterAll(async () => {
    await liberarConexion(conexion);
  });

  it('debe guardar correctamente los valores de divisas en la base de datos', async () => {
    await scrapeAndSave();

    const [rows] = await conexion.query('SELECT * FROM divisas');

    expect(rows.length).toBe(2); // Esperamos dos filas (dólar y UF)
    expect(rows.some(row => row.codigo_divisa === 'USD' && row.nombre_divisa === 'Dólar')).toBe(true);
    expect(rows.some(row => row.codigo_divisa === 'CLF' && row.nombre_divisa === 'Unidad de Fomento')).toBe(true);
  });
});
