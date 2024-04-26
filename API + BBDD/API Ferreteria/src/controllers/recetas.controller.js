import { Connection, getConnection } from "./../database/database"

// PARA OBTENER LOS RESULTADOS
const getRecetas = async (req, res) => {

    try {
        const connection = await getConnection();
        const [result] = await connection.query(
        `SELECT  
        test.id_receta, 
        test.nombre_receta, 
        test.ingrediente_receta, 
        test.anio, 
        test.pais_receta, 
        test.preparacion_receta, 
        test.fecha_creacion, 
        test.url_imagen_receta, 
        test.categoria,
        usuarios.nombres as "creado_por" 
        FROM test
        INNER JOIN usuarios ON test.id_user = usuarios.id_user;`);
        
        // Verificar si hay resultados
        if (result.length === 0) {
            console.log("No hay más resultados disponibles.");
            return res.status(404).json({ message: "No hay más resultados disponibles." });
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
        const connection = await getConnection();
        const [result] = await connection.query(
        `SELECT DISTINCT pais_receta FROM test;`);
        
        // Verificar si hay resultados
        if (result.length === 0) {
            console.log("No hay más resultados disponibles.");
            return res.status(404).json({ message: "No hay más resultados disponibles." });
        }
        // console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// PARA OBTENER LOS RESULTADOS
const recetaRandom = async (req, res) => {

    try {
        const connection = await getConnection();
        const [result] = await connection.query(
        `SELECT  
        test.id_receta, 
        test.nombre_receta, 
        test.ingrediente_receta, 
        test.anio, 
        test.pais_receta, 
        test.preparacion_receta, 
        test.fecha_creacion, 
        test.url_imagen_receta, 
        test.categoria,
        usuarios.nombres as "creado_por" 
        FROM test
        INNER JOIN usuarios ON test.id_user = usuarios.id_user
        ORDER BY RAND()
        LIMIT 1;`);
        
        // Verificar si hay resultados
        if (result.length === 0) {
            console.log("No hay más resultados disponibles.");
            return res.status(404).json({ message: "No hay más resultados disponibles." });
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
        const connection = await getConnection();
        const [result] = await connection.query(
        `SELECT DISTINCT categoria FROM test;`);
        
        // Verificar si hay resultados
        if (result.length === 0) {
            console.log("No hay más resultados disponibles.");
            return res.status(404).json({ message: "No hay más resultados disponibles." });
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
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(
            `SELECT  
            test.id_receta, 
            test.nombre_receta, 
            test.ingrediente_receta, 
            test.anio, 
            test.pais_receta, 
            test.preparacion_receta, 
            test.fecha_creacion, 
            test.categoria,
            test.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM test
            INNER JOIN usuarios ON test.id_user = usuarios.id_user
            WHERE test.id_receta=?`, id);
        // console.log(result);
         // Verificar si hay resultados
         if (result.length === 0) {
            return res.status(404).json({ message: "La receta no se encuentra disponible." });
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
        const {nombre_receta, ingrediente_receta, pais_receta, preparacion_receta, categoria, id_user} = req.body;

        // if (nombre_receta == undefined || ingrediente_receta == undefined) {
        //     return res.status(400).json({ message: "Bad Request, Por favor, completa los datos." })
        // }

        const receta = {
            nombre_receta, ingrediente_receta, pais_receta, preparacion_receta, categoria, id_user
        }

        const connection = await getConnection();
        await connection.query("INSERT INTO test SET ?", receta);
        res.json({ message: "Receta añadida exitosamente" })
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
// PARA ELIMINAR ELEMENTOS
const deleteReceta = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query("DELETE FROM test WHERE id_receta = ?;", id);

        if (result.affectedRows > 0) {
            // Elemento borrado exitosamente
            res.json({ message: `Elemento con ID ${id} borrado exitosamente.` });
        } else {
            // No se encontró ningún elemento con el ID proporcionado
            res.status(404).json({ message: `No se encontró ningún elemento con el ID ${id}.` });
        }
    } catch (error) {
        // Error en la solicitud
        res.status(500).send(error.message);
    }
};

// PARA ACTUALIZAR ELEMENTOS
const updateReceta = async (req, res) => {

    try {
        const { id } = req.params;
        const { nombre_receta, ingrediente_receta, pais_receta, categoria, preparacion_receta, id_user } = req.body;
        if (nombre_receta == undefined || ingrediente_receta == undefined) {
            return res.status(400).json({ message: "Bad Request, Por favor, completar los datos." })
        }
        const receta = {
            nombre_receta, ingrediente_receta, pais_receta, categoria, preparacion_receta, id_user
        }

        const connection = await getConnection();
        const [result] = await connection.query("UPDATE test SET ? WHERE id_receta = ?;",[receta,id]);
        
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
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(
            `SELECT  
            test.id_receta, 
            test.nombre_receta, 
            test.ingrediente_receta, 
            test.anio, 
            test.pais_receta, 
            test.preparacion_receta, 
            test.fecha_creacion, 
            test.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM test
            INNER JOIN usuarios ON test.id_user = usuarios.id_user
            WHERE test.pais_receta='chile';`);
        // console.log(result);
        // Verificar si hay resultados
        if (result.length === 0) {
            return res.status(404).json({ message: "La receta no se encuentra disponible." });
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
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(
            `SELECT  
            test.id_receta, 
            test.nombre_receta, 
            test.ingrediente_receta, 
            test.anio, 
            test.pais_receta, 
            test.preparacion_receta, 
            test.fecha_creacion, 
            test.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM test
            INNER JOIN usuarios ON test.id_user = usuarios.id_user
            WHERE test.pais_receta = 'Estados Unidos';`);
        // console.log(result);
        // Verificar si hay resultados
        if (result.length === 0) {
            return res.status(404).json({ message: "La receta no se encuentra disponible." });
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
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(
            `SELECT  
            test.id_receta, 
            test.nombre_receta, 
            test.ingrediente_receta, 
            test.anio, 
            test.pais_receta, 
            test.preparacion_receta, 
            test.fecha_creacion, 
            test.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM test
            INNER JOIN usuarios ON test.id_user = usuarios.id_user
            WHERE test.pais_receta='Gran Bretaña';`);
        // console.log(result);
        // Verificar si hay resultados
        if (result.length === 0) {
            return res.status(404).json({ message: "La receta no se encuentra disponible." });
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
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(
            `SELECT  
            test.id_receta, 
            test.nombre_receta, 
            test.ingrediente_receta, 
            test.anio, 
            test.pais_receta, 
            test.preparacion_receta, 
            test.fecha_creacion, 
            test.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM test
            INNER JOIN usuarios ON test.id_user = usuarios.id_user
            WHERE test.pais_receta='Canada';`);
        // console.log(result);
        // Verificar si hay resultados
        if (result.length === 0) {
            return res.status(404).json({ message: "La receta no se encuentra disponible." });
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
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(
            `SELECT  
            test.id_receta, 
            test.nombre_receta, 
            test.ingrediente_receta, 
            test.anio, 
            test.pais_receta, 
            test.preparacion_receta, 
            test.fecha_creacion, 
            test.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM test
            INNER JOIN usuarios ON test.id_user = usuarios.id_user
            WHERE test.pais_receta='españa';`);
        // console.log(result);
        // Verificar si hay resultados
        if (result.length === 0) {
            return res.status(404).json({ message: "La receta no se encuentra disponible." });
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
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(
            `SELECT  
            test.id_receta, 
            test.nombre_receta, 
            test.ingrediente_receta, 
            test.anio, 
            test.pais_receta, 
            test.preparacion_receta, 
            test.fecha_creacion, 
            test.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM test
            INNER JOIN usuarios ON test.id_user = usuarios.id_user
            WHERE test.pais_receta='Mexico';`);
        // console.log(result);
        // Verificar si hay resultados
        if (result.length === 0) {
            return res.status(404).json({ message: "La receta no se encuentra disponible." });
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
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(
            `SELECT  
            test.id_receta, 
            test.nombre_receta, 
            test.ingrediente_receta, 
            test.anio, 
            test.pais_receta, 
            test.preparacion_receta, 
            test.fecha_creacion, 
            test.url_imagen_receta, 
            usuarios.nombres as "creado_por" 
            FROM test
            INNER JOIN usuarios ON test.id_user = usuarios.id_user
            WHERE test.pais_receta='Argentina';`);
        // console.log(result);
        // Verificar si hay resultados
        if (result.length === 0) {
            return res.status(404).json({ message: "La receta no se encuentra disponible." });
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
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(
            `SELECT  
            test.id_receta, 
            test.nombre_receta, 
            test.ingrediente_receta, 
            test.anio, 
            test.pais_receta, 
            test.preparacion_receta, 
            test.fecha_creacion, 
            test.url_imagen_receta, 
            test.categoria, 
            usuarios.nombres as "creado_por" 
            FROM test
            INNER JOIN usuarios ON test.id_user = usuarios.id_user
            WHERE test.categoria='postres';`);
        // console.log(result);
        // Verificar si hay resultados
        if (result.length === 0) {
            return res.status(404).json({ message: "La receta no se encuentra disponible." });
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
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(
            `SELECT  
            test.id_receta, 
            test.nombre_receta, 
            test.ingrediente_receta, 
            test.anio, 
            test.pais_receta, 
            test.preparacion_receta, 
            test.fecha_creacion, 
            test.url_imagen_receta, 
            test.categoria, 
            usuarios.nombres as "creado_por" 
            FROM test
            INNER JOIN usuarios ON test.id_user = usuarios.id_user
            WHERE test.categoria='desayuno';`);
        // console.log(result);
        // Verificar si hay resultados
        if (result.length === 0) {
            return res.status(404).json({ message: "La receta no se encuentra disponible." });
        }
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    // GET 
    getRecetas, getReceta, getRecetaCL, getRecetaUSA, getRecetaGB, getRecetaCA, getRecetaES, getRecetaMX, getReceta_ARG, getPaises, recetaRandom,
    // CATEGORIAS
     getCategorias, getPostres, getDesayuno,
    // POST
    addReceta,
    // PUT
    updateReceta,
    // DELETE
    deleteReceta,
};
