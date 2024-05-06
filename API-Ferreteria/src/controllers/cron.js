const cron = require('node-cron');
const scrapeAndSave = require('./scraperdolar.controller');

// Programa una tarea para que se ejecute cada minuto
cron.schedule('*/1 * * * *', () => {
    try {
      console.log('Ejecutando scraping...');
      // Llama a tu función de scraping aquí
      scrapeAndSave();
    } catch (error) {
      console.error('Error en la tarea cron:', error);
    }
  });
  