const request = require('supertest');
const express = require('express');
const transbankRouter = require('./transbank'); // Suponiendo que este es el nombre de tu módulo

// Creamos una instancia de Express para probar las rutas
const app = express();
app.use(express.json());
app.use('/transbank', transbankRouter);

describe('Pruebas para el módulo Transbank', () => {
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

  it('debería obtener el estado de una transacción correctamente', async () => {
    // Simulamos una solicitud previa para obtener un token
    const creditResponse = await request(app)
      .post('/transbank/credit')
      .send({
        buyOrder: 'Taladro Bauker',
        sessionId: 'sessionId',
        amount: 10000,
        returnUrl: 'http://localhost:3000/transbank/endPayment/'
      });

    const token = creditResponse.body.token;

    const response = await request(app)
      .get(`/transbank/checkPayment?token=${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    // Puedes agregar más expectativas para verificar los datos de la respuesta
  });

  it('debería confirmar una transacción correctamente', async () => {
    // Simulamos una solicitud previa para obtener un token
    const creditResponse = await request(app)
      .post('/transbank/credit')
      .send({
        buyOrder: 'Taladro Bauker',
        sessionId: 'sessionId',
        amount: 10000,
        returnUrl: 'http://localhost:3000/transbank/endPayment/'
      });

    const token_ws = creditResponse.body.token;

    const response = await request(app)
      .get(`/transbank/endPayment?token_ws=${token_ws}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('ok', true);
    expect(response.body).toHaveProperty('data');
    // Puedes agregar más expectativas para verificar los datos de la respuesta
  });
});
