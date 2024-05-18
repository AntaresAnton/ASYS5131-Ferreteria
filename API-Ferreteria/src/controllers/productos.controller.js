// SELECT PROD.id_producto, PROD.nombre_producto, PROD.precio, (PROD.precio * divi.valor) AS precio_en_dolares FROM productos PROD INNER JOIN divisas DIVI ON prod.codigo_divisa = divi.codigo_divisa;

import { getConnection } from "./../database/database"
const { Producto } = require('../models/models'); // Asegúrate de que la ruta sea correcta


// PARA OBTENER LOS RESULTADOS
const obtenerProducto = async (req, res) => {

    try {
        const connection = await getConnection();
        const [result] = await connection.query(
        `SELECT 
        PROD.id, 
        
        PROD.nombre,
        PROD.precio, ROUND(PROD.precio / DIVI.valor,2) AS precio_en_dolares,
        DIVI.valor as valor_dolar_dia,
        DIVI.actualizado_el as dolar_actualizado
        FROM productos PROD 
        INNER JOIN divisas DIVI ON PROD.codigo_divisa = DIVI.codigo_divisa;
     `);
        
        // Verificar si hay resultados
        if (result.length === 0) {
            console.log("No hay productos disponibles.");
            return res.status(404).json({ message: "No hay productos disponibles." });
        }
        // console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// para borrar productos:

const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Busca y elimina el producto por su ID
        const deletedRows = await Producto.destroy({
            where: {
                id: id
            }
        });

        if (deletedRows > 0) {
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



export const products = {
    // GET 
    obtenerProducto,
    deleteProducto
};


// INSERT INTO productos (id, nombre, descripcion, precio, codigo_divisa, cantidad_disponible, id_categoria)
// VALUES (NULL, 'pala', 'nunca hay usao una pala', '29550', 'USD', '210', '3');