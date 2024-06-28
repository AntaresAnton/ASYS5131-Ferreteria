const { Router } = require("express");
const { httpError } = require("../utils/error");
const WebpayPlus = require("transbank-sdk").WebpayPlus;
const { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes} = require("transbank-sdk");

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




// const { Router } = require("express");
// const WebpayPlus = require("transbank-sdk").WebpayPlus;
// const { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = require("transbank-sdk");
// const { validateCreditInput, validateToken } = require("../utils/validators");
// const { CustomError, handleError } = require("../utils/error");
// const logger = require("../utils/logger");

// // Use environment variables for configuration
// const COMMERCE_CODE = process.env.COMMERCE_CODE || IntegrationCommerceCodes.WEBPAY_PLUS;
// const API_KEY = process.env.API_KEY || IntegrationApiKeys.WEBPAY;
// const ENVIRONMENT = process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Integration;

// const tx = new WebpayPlus.Transaction(new Options(COMMERCE_CODE, API_KEY, ENVIRONMENT));

// const router = Router();

// // Route to initiate payment transaction
// router.post("/credit", async (req, res) => {
//   try {
//     const { buyOrder, sessionId, amount, returnUrl } = req.body;
    
//     // Input validation
//     validateCreditInput(buyOrder, sessionId, amount, returnUrl);

//     const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
//     logger.info(`Payment initiated: ${JSON.stringify(response)}`);
    
//     res.json({
//       ok: true,
//       url: response.url,
//       token: response.token,
//     });
//   } catch (e) {
//     logger.error(`Error initiating payment: ${e.message}`);
//     handleError(res, e);
//   }
// });

// // Check transaction status in Transbank
// router.get("/checkPayment", async (req, res) => {
//   try {
//     const { token } = req.query;
//     validateToken(token);

//     const response = await tx.status(token);
//     logger.info(`Payment status checked: ${JSON.stringify(response)}`);
    
//     res.json({
//       data: response,
//     });
//   } catch (e) {
//     logger.error(`Error checking payment status: ${e.message}`);
//     handleError(res, e);
//   }
// });

// // Route to receive Transbank response
// router.get("/endPayment", async (req, res) => {
//   try {
//     const { token_ws } = req.query;
//     validateToken(token_ws);

//     const response = await tx.commit(token_ws);
//     logger.info(`Payment completed: ${JSON.stringify(response)}`);
    
//     res.json({
//       ok: true,
//       data: response,
//     });
//   } catch (e) {
//     logger.error(`Error confirming payment: ${e.message}`);
//     handleError(res, e);
//   }
// });

// module.exports = router;
