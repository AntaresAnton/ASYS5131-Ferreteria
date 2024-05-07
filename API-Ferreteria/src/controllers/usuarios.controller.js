import { getConnection } from "../database/database"
const getUser = async (req, res) => {

    try {
        // console.log(req.params)
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query("SELECT id,nombre,correo,rol FROM usuarios");
        // console.log(result);
        // Verificar si hay resultados
        if (result.length === 0) {
            return res.status(404).json({ message: "Usuario no disponible" });
        }
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const ejemploUserPaginado = async (req, res) => {
    try {
        const { page } = req.query; // Obtener el número de página de la consulta
        const itemsPerPage = 10; // Número de resultados por página

        // Calcular el offset basado en la página actual
        const offset = (page - 1) * itemsPerPage;

        const connection = await getConnection();

        // Consulta SQL con LIMIT y OFFSET para la paginación
        const [result] = await connection.query(
            `SELECT id,nombre,correo,rol FROM usuarios LIMIT ${itemsPerPage} OFFSET ${offset}`
        );

        // Verificar si hay resultados
        if (result.length === 0) {
            return res.status(404).json({ message: "No hay más resultados disponibles." });
        }

        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// PARA AÑADIR USUARIOS
const addUsuario = async (req, res) => {

    try {
        const { nombre,correo,contrasena,rol } = req.body;
        // console.log(banda)
        // console.log(disco)
        if (nombre == undefined || correo == undefined) {
            res.status(400).json({ message: "Bad Request, Por favor, completa los datos." })
        }
        const usuarionuevo = {
            nombre,correo,contrasena,rol
        }
        const connection = await getConnection();
        await connection.query("INSERT INTO usuarios SET ?", usuarionuevo);
        res.json({ message: `Usuario ${user} añadido exitosamente` })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// PARA ACTUALIZAR USUARIOS
const updateUsuario = async (req, res) => {

    try {
        const { id } = req.params;
        const { nombre,correo,contrasena,rol } = req.body;
        if (nombre === undefined) {
            return res.status(400).json({ message: "Bad Request, Por favor, completar los datos." })
        }
        const usuarioupdate = {
            nombre,correo,contrasena,rol
        }

        const connection = await getConnection();
        const [result] = await connection.query("UPDATE usuarios SET ? WHERE id_user = ?;", [usuarioupdate, id]);
        res.json({ message: `Usuario ${user} Editado exitosamente` })
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
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query("DELETE FROM usuarios WHERE id_user = ?;", id);

        if (result.affectedRows > 0) {
            // Elemento borrado exitosamente
            res.json({ message: `Usuario con ID ${id} borrado exitosamente.` });
        } else {
            // No se encontró ningún elemento con el ID proporcionado
            res.status(404).json({ message: `No se encontró ningún usuario con el ID ${id}.` });
        }
    } catch (error) {
        // Error en la solicitud
        res.status(500).send(error.message);
    }
};
export const usermethods = {
    // gestión usuarios
    getUser, ejemploUserPaginado, addUsuario, updateUsuario, deleteUsuario,
};