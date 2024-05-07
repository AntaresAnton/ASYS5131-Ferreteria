// routes - rutas
// import LanguageRoutes from "./routes/language.routes"
const LanguageRoutes = require('./routes/recetas.routes');
const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const express = require('express')
const morgan = require('morgan')
// import express from "express";
// import morgan from "morgan";
const app = express(); //ejecu express
const cors = require('cors')
// settings
app.set("port", 3000);
// middleware
app.use(morgan("dev"));
app.use(cors(
    { origin: ['http://localhost:3000',] }
));
app.use(express.json());

// routes
// app.use("/listado", LanguageRoutes)
app.use("/", LanguageRoutes)
app.use("/", productosRoutes)
app.use("/", usuariosRoutes)
app.use("/", pedidosRoutes)
// app.use("/api/usuarios")

module.exports = app;