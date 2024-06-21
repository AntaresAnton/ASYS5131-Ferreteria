const cron = require("node-cron");
const scrapeAndSave = require("./scraperdolar.controller");

let isShuttingDown = false;

// Programa una tarea para que se ejecute cada minuto (puedes ajustar esto según necesites)
cron.schedule("*/1 * * * *", async () => {
  if (isShuttingDown) return;

  try {
    console.log(`[${new Date().toISOString()}] Iniciando scraping...`);
    
    // Implementar rate limiting básico
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo antes de cada scraping

    // Llama a tu función de scraping aquí
    await scrapeAndSave();

    console.log(`[${new Date().toISOString()}] Scraping completado exitosamente`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error en la tarea cron:`, error);
    // Aquí podrías implementar algún tipo de notificación si lo deseas
  }
});

// Manejo de cierre graceful
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown() {
  isShuttingDown = true;
  console.log('Cerrando...');
  // Dar tiempo para que las operaciones en curso terminen
  setTimeout(() => {
    console.log('Cierre completado');
    process.exit(0);
  }, 5000); // Espera 5 segundos antes de cerrar
}
