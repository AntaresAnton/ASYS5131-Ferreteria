const request = require('supertest');
const express = require('express');
const transbankRoutes = require('../routes/transbank.routes');

describe('Pruebas E2E para transbank.routes.js', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/transbank', transbankRoutes);
  });

  describe('POST /transbank/credit', () => {
    it('debería iniciar una transacción de crédito correctamente', async () => {
      const payload = {
        buyOrder: 'Orden de compra',
        sessionId: 'sessionId',
        amount: 50000,
        returnUrl: 'http://localhost:3000/transbank/endPayment/',
      };

      const response = await request(app)
        .post('/transbank/credit')
        .send(payload)
        .expect(200);

      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('url');
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('GET /transbank/checkPayment', () => {
    it('debería obtener el estado de una transacción correctamente', async () => {
      // Primero, inicia una transacción de crédito para obtener un token
      const creditResponse = await request(app)
        .post('/transbank/credit')
        .send({
          buyOrder: 'Orden de compra',
          sessionId: 'sessionId',
          amount: 50000,
          returnUrl: 'http://localhost:3000/transbank/endPayment/',
        });

      const token = creditResponse.body.token;

      const response = await request(app)
        .get(`/transbank/checkPayment?token=${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      // Agrega más expectativas según sea necesario
    });
  });

  describe('GET /transbank/endPayment', () => {
    it('debería confirmar una transacción correctamente', async () => {
      // Primero, inicia una transacción de crédito para obtener un token
      const creditResponse = await request(app)
        .post('/transbank/credit')
        .send({
          buyOrder: 'Orden de compra',
          sessionId: 'sessionId',
          amount: 50000,
          returnUrl: 'http://localhost:3000/transbank/endPayment/',
        });

      const token = creditResponse.body.token;

      const response = await request(app)
        .get(`/transbank/endPayment?token_ws=${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('ok', true);
      expect(response.body).toHaveProperty('data');
      // Agrega más expectativas según sea necesario
    });
  });
});