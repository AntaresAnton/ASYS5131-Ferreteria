// SELECT PROD.id_producto, PROD.nombre_producto, PROD.precio, (PROD.precio * divi.valor) AS precio_en_dolares FROM productos PROD INNER JOIN divisas DIVI ON prod.codigo_divisa = divi.codigo_divisa;

import { getConnection } from "./../database/database"

// PARA OBTENER LOS RESULTADOS
const obtenerProducto = async (req, res) => {

    try {
        const connection = await getConnection();
        const [result] = await connection.query(
        `SELECT 
        PROD.id_producto, 
        PROD.sku,
        PROD.nombre_producto,
        PROD.precio, ROUND(PROD.precio / DIVI.valor,2) AS precio_en_dolares,
        DIVI.valor as valor_dolar_dia,
        DIVI.actualizado_el as dolar_actualizado
        FROM productos PROD 
        INNER JOIN divisas DIVI ON PROD.codigo_divisa = DIVI.codigo_divisa;`);
        
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


export const products = {
    // GET 
    obtenerProducto
};