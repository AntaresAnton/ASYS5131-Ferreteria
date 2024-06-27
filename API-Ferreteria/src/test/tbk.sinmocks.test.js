const request = require('supertest');
const express = require('express');
const transbankRouter = require('../routes/transbank.routes');

// Creamos una instancia de Express para probar las rutas
const app = express();
app.use(express.json());
app.use('/transbank', transbankRouter);

describe('Pruebas de integración para el módulo Transbank', () => {
  it('debería iniciar una transacción de crédito correctamente', async () => {
    const response = await request(app)
      .post('/transbank/credit')
      .send({
        buyOrder: 'Taladro Bauker',
        sessionId: 'sessionId',
        amount: 25500,
        returnUrl: 'http://localhost:3000/transbank/endPayment/'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('ok', true);
    expect(response.body).toHaveProperty('url');
    expect(response.body).toHaveProperty('token');
  });
});
