
// http://localhost:3000/transbank/credit
// POST
const transbank_credit = {

    "buyOrder" : "Set de herramientas",
    "sessionId" : "sessionId",
    "amount" : "50000",
    "returnUrl" : "http://localhost:3000/transbank/endPayment/"

}

// http://localhost:3000/transbank/checkPayment
// GET
const checkPayment = {
    "token": "01abfc14ca6193f5d13dd3b84812dc88582a9015353520e387744b99c147fc0d"
}


// http://localhost:3000/transbank/endPayment

const endPayment = {
    "token": "01ab63020db370205f2da3f2343cd61d3c1a2c720e30b86022e3802e64fa483d"
}

const paramsCredit = {
    tarjeta: 4051885600446623,
    rut: "11.111.111-1",
    CVV: 123,
    tipo: visa
}