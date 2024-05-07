import { Router } from "express";
import { methods as recetasController } from "../controllers/recetas.controller";

// ruta del proyecto
const router = Router();
router.get("/", (req, res) => {
    recetasController.getRecetas(req, res);
});
// router.put('/add-receta', (req, res) => {
//     res.status(200).send('Receta agregada exitosamente'); // http://localhost:3000/add-receta
// });
export default router;
module.exports = router