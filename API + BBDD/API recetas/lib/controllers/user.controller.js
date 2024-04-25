"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usermethods = void 0;
var _database = require("./../database/database");
// =======================================================================
//    ===================== GESTIÓN DE USUARIOS ========================
// =======================================================================
const getUser = async (req, res) => {
  try {
    // console.log(req.params)
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query("SELECT id_user,nombres,user,fecha_creacion FROM usuarios");
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
const ejemploUserPaginado = async (req, res) => {
  try {
    const {
      page
    } = req.query; // Obtener el número de página de la consulta
    const itemsPerPage = 10; // Número de resultados por página

    // Calcular el offset basado en la página actual
    const offset = (page - 1) * itemsPerPage;
    const connection = await (0, _database.getConnection)();

    // Consulta SQL con LIMIT y OFFSET para la paginación
    const [result] = await connection.query(`SELECT id_user, nombres, user, fecha_creacion FROM usuarios LIMIT ${itemsPerPage} OFFSET ${offset}`);

    // Verificar si hay resultados
    if (result.length === 0) {
      return res.status(404).json({
        message: "No hay más resultados disponibles."
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// PARA AÑADIR USUARIOS
const addUsuario = async (req, res) => {
  try {
    const {
      nombres,
      user,
      password,
      fecha_creacion
    } = req.body;
    // console.log(banda)
    // console.log(disco)
    if (nombres == undefined || user == undefined) {
      res.status(400).json({
        message: "Bad Request, Por favor, completa los datos."
      });
    }
    const usuarionuevo = {
      nombres,
      user,
      password,
      fecha_creacion
    };
    const connection = await (0, _database.getConnection)();
    await connection.query("INSERT INTO usuarios SET ?", usuarionuevo);
    res.json({
      message: `Usuario ${user} añadido exitosamente`
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// PARA ACTUALIZAR USUARIOS
const updateUsuario = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      nombres,
      user,
      password
    } = req.body;
    if (user === undefined) {
      return res.status(400).json({
        message: "Bad Request, Por favor, completar los datos."
      });
    }
    const usuarioupdate = {
      nombres,
      user,
      password
    };
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query("UPDATE usuarios SET ? WHERE id_user = ?;", [usuarioupdate, id]);
    res.json({
      message: `Usuario ${user} Editado exitosamente`
    });
    // console.log(result);
    // res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// PARA ELIMINAR ELEMENTOS
const deleteUsuario = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const connection = await (0, _database.getConnection)();
    const [result] = await connection.query("DELETE FROM usuarios WHERE id_user = ?;", id);
    if (result.affectedRows > 0) {
      // Elemento borrado exitosamente
      res.json({
        message: `Usuario con ID ${id} borrado exitosamente.`
      });
    } else {
      // No se encontró ningún elemento con el ID proporcionado
      res.status(404).json({
        message: `No se encontró ningún usuario con el ID ${id}.`
      });
    }
  } catch (error) {
    // Error en la solicitud
    res.status(500).send(error.message);
  }
};
const usermethods = exports.usermethods = {
  // gestión usuarios
  getUser,
  ejemploUserPaginado,
  addUsuario,
  updateUsuario,
  deleteUsuario
};