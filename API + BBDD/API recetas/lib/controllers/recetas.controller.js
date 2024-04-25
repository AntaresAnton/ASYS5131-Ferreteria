"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;
var _database = require("./../database/database");
// PARA OBTENER LOS RESULTADOS
const getRecetas = async (req, res) => {
  try {
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT  
        recetas_del_mundo.id_receta, 
        recetas_del_mundo.nombre_receta, 
        recetas_del_mundo.ingrediente_receta, 
        recetas_del_mundo.anio, 
        recetas_del_mundo.pais_receta, 
        recetas_del_mundo.preparacion_receta, 
        recetas_del_mundo.fecha_creacion, 
        recetas_del_mundo.url_imagen_receta, 
        recetas_del_mundo.categoria,
        usuarios.nombres as "creado_por" 
        FROM recetas_del_mundo
        INNER JOIN usuarios ON recetas_del_mundo.id_user = usuarios.id_user;`);

    // Verificar si hay resultados
    if (result.length === 0) {
      console.log("No hay más resultados disponibles.");
      return res.status(404).json({
        message: "No hay más resultados disponibles."
      });
    }
    // console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// PARA OBTENER LOS RESULTADOS
const getPaises = async (req, res) => {
  try {
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT DISTINCT pais_receta FROM recetas_del_mundo;`);

    // Verificar si hay resultados
    if (result.length === 0) {
      console.log("No hay más resultados disponibles.");
      return res.status(404).json({
        message: "No hay más resultados disponibles."
      });
    }
    // console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// PARA OBTENER LOS RESULTADOS
const getCategorias = async (req, res) => {
  try {
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT DISTINCT categoria FROM recetas_del_mundo;`);

    // Verificar si hay resultados
    if (result.length === 0) {
      console.log("No hay más resultados disponibles.");
      return res.status(404).json({
        message: "No hay más resultados disponibles."
      });
    }
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// PARA OBTENERLOS POR id
const getReceta = async (req, res) => {
  try {
    // console.log(req.params)
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT  
            recetas_del_mundo.id_receta, 
            recetas_del_mundo.nombre_receta, 
            recetas_del_mundo.ingrediente_receta, 
            recetas_del_mundo.anio, 
            recetas_del_mundo.pais_receta, 
            recetas_del_mundo.preparacion_receta, 
            recetas_del_mundo.fecha_creacion, 
            recetas_del_mundo.categoria,
            recetas_del_mundo.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM recetas_del_mundo
            INNER JOIN usuarios ON recetas_del_mundo.id_user = usuarios.id_user
            WHERE recetas_del_mundo.id_receta=?`, id);
    // console.log(result);
    // Verificar si hay resultados
    if (result.length === 0) {
      return res.status(404).json({
        message: "La receta no se encuentra disponible."
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// PARA AÑADIR ELEMENTOS
const addReceta = async (req, res) => {
  try {
    const {
      nombre_receta,
      ingrediente_receta,
      pais_receta,
      preparacion_receta,
      categoria,
      id_user
    } = req.body;

    // if (nombre_receta == undefined || ingrediente_receta == undefined) {
    //     return res.status(400).json({ message: "Bad Request, Por favor, completa los datos." })
    // }

    const receta = {
      nombre_receta,
      ingrediente_receta,
      pais_receta,
      preparacion_receta,
      categoria,
      id_user
    };
    const connection = await (0, _database.getConnection)();
    await connection.query("INSERT INTO recetas_del_mundo SET ?", receta);
    res.json({
      message: "Receta añadida exitosamente"
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
// PARA ELIMINAR ELEMENTOS
const deleteReceta = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query("DELETE FROM recetas_del_mundo WHERE id_receta = ?;", id);
    if (result.affectedRows > 0) {
      // Elemento borrado exitosamente
      res.json({
        message: `Elemento con ID ${id} borrado exitosamente.`
      });
    } else {
      // No se encontró ningún elemento con el ID proporcionado
      res.status(404).json({
        message: `No se encontró ningún elemento con el ID ${id}.`
      });
    }
  } catch (error) {
    // Error en la solicitud
    res.status(500).send(error.message);
  }
};

// PARA ACTUALIZAR ELEMENTOS
const updateReceta = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      nombre_receta,
      ingrediente_receta,
      pais_receta,
      categoria,
      preparacion_receta,
      id_user
    } = req.body;
    if (nombre_receta == undefined || ingrediente_receta == undefined) {
      return res.status(400).json({
        message: "Bad Request, Por favor, completar los datos."
      });
    }
    const receta = {
      nombre_receta,
      ingrediente_receta,
      pais_receta,
      categoria,
      preparacion_receta,
      id_user
    };
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query("UPDATE recetas_del_mundo SET ? WHERE id_receta = ?;", [receta, id]);

    // console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// ============================DESGLOSE POR PAISES ========================================
// LISTADO:
// Chile || Estados Unidos || Gran Bretaña || Canada || España || Mexico || Argentina

// PARA OBTENERLOS POR pais = chile
const getRecetaCL = async (req, res) => {
  try {
    // console.log(req.params)
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT  
            recetas_del_mundo.id_receta, 
            recetas_del_mundo.nombre_receta, 
            recetas_del_mundo.ingrediente_receta, 
            recetas_del_mundo.anio, 
            recetas_del_mundo.pais_receta, 
            recetas_del_mundo.preparacion_receta, 
            recetas_del_mundo.fecha_creacion, 
            recetas_del_mundo.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM recetas_del_mundo
            INNER JOIN usuarios ON recetas_del_mundo.id_user = usuarios.id_user
            WHERE recetas_del_mundo.pais_receta='chile';`);
    // console.log(result);
    // Verificar si hay resultados
    if (result.length === 0) {
      return res.status(404).json({
        message: "La receta no se encuentra disponible."
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// PARA OBTENERLOS POR pais = Estados Unidos
const getRecetaUSA = async (req, res) => {
  try {
    // console.log(req.params)
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT  
            recetas_del_mundo.id_receta, 
            recetas_del_mundo.nombre_receta, 
            recetas_del_mundo.ingrediente_receta, 
            recetas_del_mundo.anio, 
            recetas_del_mundo.pais_receta, 
            recetas_del_mundo.preparacion_receta, 
            recetas_del_mundo.fecha_creacion, 
            recetas_del_mundo.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM recetas_del_mundo
            INNER JOIN usuarios ON recetas_del_mundo.id_user = usuarios.id_user
            WHERE recetas_del_mundo.pais_receta = 'Estados Unidos';`);
    // console.log(result);
    // Verificar si hay resultados
    if (result.length === 0) {
      return res.status(404).json({
        message: "La receta no se encuentra disponible."
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
// PARA OBTENERLOS POR pais = Gran Bretaña
const getRecetaGB = async (req, res) => {
  try {
    // console.log(req.params)
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT  
            recetas_del_mundo.id_receta, 
            recetas_del_mundo.nombre_receta, 
            recetas_del_mundo.ingrediente_receta, 
            recetas_del_mundo.anio, 
            recetas_del_mundo.pais_receta, 
            recetas_del_mundo.preparacion_receta, 
            recetas_del_mundo.fecha_creacion, 
            recetas_del_mundo.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM recetas_del_mundo
            INNER JOIN usuarios ON recetas_del_mundo.id_user = usuarios.id_user
            WHERE recetas_del_mundo.pais_receta='Gran Bretaña';`);
    // console.log(result);
    // Verificar si hay resultados
    if (result.length === 0) {
      return res.status(404).json({
        message: "La receta no se encuentra disponible."
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
// PARA OBTENERLOS POR pais = chile
const getRecetaCA = async (req, res) => {
  try {
    // console.log(req.params)
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT  
            recetas_del_mundo.id_receta, 
            recetas_del_mundo.nombre_receta, 
            recetas_del_mundo.ingrediente_receta, 
            recetas_del_mundo.anio, 
            recetas_del_mundo.pais_receta, 
            recetas_del_mundo.preparacion_receta, 
            recetas_del_mundo.fecha_creacion, 
            recetas_del_mundo.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM recetas_del_mundo
            INNER JOIN usuarios ON recetas_del_mundo.id_user = usuarios.id_user
            WHERE recetas_del_mundo.pais_receta='Canada';`);
    // console.log(result);
    // Verificar si hay resultados
    if (result.length === 0) {
      return res.status(404).json({
        message: "La receta no se encuentra disponible."
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
// PARA OBTENERLOS POR pais = chile
const getRecetaES = async (req, res) => {
  try {
    // console.log(req.params)
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT  
            recetas_del_mundo.id_receta, 
            recetas_del_mundo.nombre_receta, 
            recetas_del_mundo.ingrediente_receta, 
            recetas_del_mundo.anio, 
            recetas_del_mundo.pais_receta, 
            recetas_del_mundo.preparacion_receta, 
            recetas_del_mundo.fecha_creacion, 
            recetas_del_mundo.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM recetas_del_mundo
            INNER JOIN usuarios ON recetas_del_mundo.id_user = usuarios.id_user
            WHERE recetas_del_mundo.pais_receta='españa';`);
    // console.log(result);
    // Verificar si hay resultados
    if (result.length === 0) {
      return res.status(404).json({
        message: "La receta no se encuentra disponible."
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
// PARA OBTENERLOS POR pais = chile
const getRecetaMX = async (req, res) => {
  try {
    // console.log(req.params)
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT  
            recetas_del_mundo.id_receta, 
            recetas_del_mundo.nombre_receta, 
            recetas_del_mundo.ingrediente_receta, 
            recetas_del_mundo.anio, 
            recetas_del_mundo.pais_receta, 
            recetas_del_mundo.preparacion_receta, 
            recetas_del_mundo.fecha_creacion, 
            recetas_del_mundo.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM recetas_del_mundo
            INNER JOIN usuarios ON recetas_del_mundo.id_user = usuarios.id_user
            WHERE recetas_del_mundo.pais_receta='Mexico';`);
    // console.log(result);
    // Verificar si hay resultados
    if (result.length === 0) {
      return res.status(404).json({
        message: "La receta no se encuentra disponible."
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
// PARA OBTENERLOS POR pais = chile
const getReceta_ARG = async (req, res) => {
  try {
    // console.log(req.params)
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT  
            recetas_del_mundo.id_receta, 
            recetas_del_mundo.nombre_receta, 
            recetas_del_mundo.ingrediente_receta, 
            recetas_del_mundo.anio, 
            recetas_del_mundo.pais_receta, 
            recetas_del_mundo.preparacion_receta, 
            recetas_del_mundo.fecha_creacion, 
            recetas_del_mundo.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM recetas_del_mundo
            INNER JOIN usuarios ON recetas_del_mundo.id_user = usuarios.id_user
            WHERE recetas_del_mundo.pais_receta='Argentina';`);
    // console.log(result);
    // Verificar si hay resultados
    if (result.length === 0) {
      return res.status(404).json({
        message: "La receta no se encuentra disponible."
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
// =====================================================================
// GESTION DE CATEGORIAS COMO POSTRES, ETC
// =====================================================================

// seleccionar postres
const getPostres = async (req, res) => {
  try {
    // console.log(req.params)
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT  
            recetas_del_mundo.id_receta, 
            recetas_del_mundo.nombre_receta, 
            recetas_del_mundo.ingrediente_receta, 
            recetas_del_mundo.anio, 
            recetas_del_mundo.pais_receta, 
            recetas_del_mundo.preparacion_receta, 
            recetas_del_mundo.fecha_creacion, 
            recetas_del_mundo.url_imagen_receta, 
            recetas_del_mundo.categoria, 
            usuarios.nombres as "creado_por" 
            FROM recetas_del_mundo
            INNER JOIN usuarios ON recetas_del_mundo.id_user = usuarios.id_user
            WHERE recetas_del_mundo.categoria='postres';`);
    // console.log(result);
    // Verificar si hay resultados
    if (result.length === 0) {
      return res.status(404).json({
        message: "La receta no se encuentra disponible."
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// seleccionar desayunos
const getDesayuno = async (req, res) => {
  try {
    // console.log(req.params)
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query(`SELECT  
            recetas_del_mundo.id_receta, 
            recetas_del_mundo.nombre_receta, 
            recetas_del_mundo.ingrediente_receta, 
            recetas_del_mundo.anio, 
            recetas_del_mundo.pais_receta, 
            recetas_del_mundo.preparacion_receta, 
            recetas_del_mundo.fecha_creacion, 
            recetas_del_mundo.url_imagen_receta, 
            recetas_del_mundo.categoria, 
            usuarios.nombres as "creado_por" 
            FROM recetas_del_mundo
            INNER JOIN usuarios ON recetas_del_mundo.id_user = usuarios.id_user
            WHERE recetas_del_mundo.categoria='desayuno';`);
    // console.log(result);
    // Verificar si hay resultados
    if (result.length === 0) {
      return res.status(404).json({
        message: "La receta no se encuentra disponible."
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
const methods = exports.methods = {
  // GET 
  getRecetas,
  getReceta,
  getRecetaCL,
  getRecetaUSA,
  getRecetaGB,
  getRecetaCA,
  getRecetaES,
  getRecetaMX,
  getReceta_ARG,
  getPaises,
  // CATEGORIAS
  getCategorias,
  getPostres,
  getDesayuno,
  // POST
  addReceta,
  // PUT
  updateReceta,
  // DELETE
  deleteReceta
};