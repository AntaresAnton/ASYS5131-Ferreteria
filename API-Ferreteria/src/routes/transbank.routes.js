const { Router } = require("express");
const { httpError } = require("../utils/error");
const WebpayPlus = require("transbank-sdk").WebpayPlus;
const {
  Options,
  IntegrationApiKeys,
  Environment,
  IntegrationCommerceCodes,
} = require("transbank-sdk");

const tx = new WebpayPlus.Transaction(
  new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  )
);

const router = Router();

// Ruta para iniciar el pago transaction
router.post("/credit", async (req, res) => {
  try {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;
    const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
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

// Chequea el estado de la transacción en Transbank
router.get("/checkPayment", async (req, res) => {
  try {
    const { token } = req.query;
    const response = await tx.status(token);
    res.json({
      data: response,
    });
  } catch (e) {
    console.error(e);
    httpError(res, "Error al validar el estado del pago", e);
  }
});

// Ruta para recibir la respuesta de Transbank
router.get("/endPayment", async (req, res) => {
  try {
    const { token_ws } = req.query; // Usa req.query en lugar de req.body para obtener el token
    if (!token_ws) {
      throw new Error("Token no proporcionado");
    }
    const response = await tx.commit(token_ws);
    res.json({
      ok: true,
      data: response,
    });
  } catch (e) {
    console.error(e);
    httpError(res, "Error al confirmar pago", e);
  }
});

module.exports = router;
