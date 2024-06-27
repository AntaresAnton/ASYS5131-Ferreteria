/**
 * @file cron.js
 * @description Este archivo configura y ejecuta tareas programadas (cron jobs) para el scraping de datos.
 * 
 * @requires node-cron
 * @requires ./scraperdolar.controller
 * 
 * @overview
 * Este script configura una tarea cron que se ejecuta cada minuto para realizar scraping de datos.
 * Incluye manejo de errores, rate limiting básico y un mecanismo de cierre graceful.
 * 
 * Características principales:
 * - Utiliza node-cron para programar la tarea de scraping.
 * - Implementa un rate limiting básico para evitar sobrecarga en el sitio objetivo.
 * - Maneja errores y los registra en la consola.
 * - Proporciona un mecanismo de cierre graceful para terminar limpiamente el proceso.
 * 
 * @author [Johanna Hernández - Zaida König - Patricio Quintanilla]
 * @version 1.0.0
 * @date [21-06-2024]
 */

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