// jest.config.js
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      "controllers/**/*.js",  // Incluye archivos en el directorio controllers
      "!**/node_modules/**",  // Excluye el directorio node_modules
    ],
    coverageDirectory: "coverage",  // Directorio donde se guardará el informe de cobertura
    coverageReporters: ["html", "text"],  // Formatos de informe de cobertura
    testEnvironment: "node",  // Configuración del entorno de pruebas
  };
  