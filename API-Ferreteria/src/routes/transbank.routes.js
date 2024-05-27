/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Successful response
 */
// Obtenemos el método Router de express
const { Router } = require("express");
const { httpError } = require("../utils/error");
// Importamos el SDK de Transbank
const WebpayPlus = require("transbank-sdk").WebpayPlus;
const {
  Options,
  IntegrationApiKeys,
  Environment,
  IntegrationCommerceCodes,
  TransactionNonInsertedCodes,
} = require("transbank-sdk");
// Configura las opciones de Transbank
const tx = new WebpayPlus.Transaction(
  new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  )
);
// Instancia de nuestra Router de Express
const router = Router();

// Ruta para iniciar el pago transaction
router.post("/credit", async (req, res) => {
  try {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;
    // Crea la transacción con los valores recibidos
    const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
    // Redirige al usuario al formulario de pago de Transbank
    //res.redirect(response.url);
    res.json({
      ok: true,
      url: response.url,
      token: response.token,
    });
  } catch (e) {
    console.error(e);
    httpError(res, "Error al iniciar pago", e);
  }
});

// chequea es estdo de la transacción en  Transbank
router.get("/checkPayment", async (req, res) => {
  try {
    const { token } = req.body;
    const response = await tx.status(token);
    // Aquí puedes manejar la respuesta de Transbank
    res.json({
      data: response,
    });
  } catch (e) {
    console.error(e);
    httpError(res, "Error al validar el estado del pago");
  }
});

// Ruta para recibir la respuesta de Transbank
router.get("/endPayment", async (req, res) => {
  try {
    const { token } = req.body;
    const response = await tx.commit(token);
    // Aquí puedes manejar la respuesta de Transbank
    console.log("ERROR!!! ", response);
    res.json({
      data: response,
    });
  } catch (e) {
    console.error(e);
    httpError(res, "Error al confirmar pago");
  }
});
// Exporta nuestra ruta para nuestro index.js
module.exports = router;
