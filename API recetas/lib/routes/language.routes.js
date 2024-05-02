"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _recetas = require("../controllers/recetas.controller");
var _user = require("../controllers/user.controller");
// ruta del proyecto
const router = (0, _express.Router)();
// url principales | http://localhost:3000/
// router.get("/", recetasController.getRecetas);
router.get("/", (req, res) => {
  _recetas.methods.getRecetas(req, res);
});
// router.get("/usuario", userController.getUser);
router.get("/usuario", (req, res) => {
  _user.usermethods.getUser(req, res);
});

// ========= RECETAS =========

// METODOS GET
router.get("/receta/:id", _recetas.methods.getReceta); // http://localhost:3000/receta/numero
router.get("/recetas-chile", _recetas.methods.getRecetaCL); // http://localhost:3000/recetas-chile
router.get("/recetas-usa", _recetas.methods.getRecetaUSA); // http://localhost:3000/recetas-usa
router.get("/recetas-gb", _recetas.methods.getRecetaGB); // http://localhost:3000/recetas-gb
router.get("/recetas-canada", _recetas.methods.getRecetaCA); // http://localhost:3000/recetas-canada
router.get("/recetas-es", _recetas.methods.getRecetaES); // http://localhost:3000/recetas-es
router.get("/recetas-mexico", _recetas.methods.getRecetaMX); // http://localhost:3000/recetas-mexico
router.get("/recetas-argentina", _recetas.methods.getReceta_ARG); // http://localhost:3000/recetas-argentina
router.get("/paises", _recetas.methods.getPaises); // http://localhost:3000/paises
router.get("/categorias", _recetas.methods.getCategorias); // http://localhost:3000/categorias
router.get("/categorias-postres", _recetas.methods.getPostres); // http://localhost:3000/categorias-postres
router.get("/categorias-desayuno", _recetas.methods.getDesayuno); // http://localhost:3000/categorias-desayuno
// METODOS POST
// Ruta PUT para agregar una receta
router.put('/add-receta', (req, res) => {
  res.status(200).send('Receta agregada exitosamente'); // http://localhost:3000/add-receta
});
// METODOS PUT
router.put("/edit-receta/:id", _recetas.methods.updateReceta); // http://localhost:3000/edit-receta/numero
// METODOS DELETE
router.delete("/delete-receta/:id", _recetas.methods.deleteReceta); // http://localhost:3000/delete-receta/numero

// ========= USUARIOS =========

// METODO GET
router.get("/", _user.usermethods.getUser); // http://localhost:3000/usuario
router.get("/usuarioejemplo", _user.usermethods.ejemploUserPaginado); // http://localhost:3000/usuarioejemplo?page=1
// METODO POST
router.post("/usuario"); // http://localhost:3000/usuario
// METODO PUT
router.put("/usuario"); // http://localhost:3000/usuario
// METODO DELETE
router.delete("/usuario"); // http://localhost:3000/usuario
var _default = exports.default = router;
module.exports = router;