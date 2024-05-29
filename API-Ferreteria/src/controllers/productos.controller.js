// SELECT PROD.id_producto, PROD.nombre_producto, PROD.precio, (PROD.precio * divi.valor) AS precio_en_dolares FROM productos PROD INNER JOIN divisas DIVI ON prod.codigo_divisa = divi.codigo_divisa;

import { getConnection } from "./../database/database";
const sequelize = require("../database/database");

// PARA OBTENER LOS RESULTADOS
const obtenerProducto = async (req, res) => {
  try {
    const sequelize = await getConnection();
    const [result, metadata] = await sequelize.query(
      `SELECT 
        PROD.id, 
        PROD.sku,
        PROD.nombre,
        PROD.descripcion,
        PROD.marca,
        PROD.precio, ROUND(PROD.precio / DIVI.valor,2) AS precio_en_dolares,
        PROD.cantidad_disponible AS stock_disponible,
        DIVI.valor as valor_dolar_dia,
        DATE_FORMAT(DIVI.actualizado_el, '%d-%m-%Y - %H:%i') as fecha_actualizacion_dolar
        FROM productos PROD 
        INNER JOIN divisas DIVI ON PROD.codigo_divisa = DIVI.codigo_divisa;
     `
    );

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

// PARA OBTENERLOS POR id
const productoPorID = async (req, res) => {
  try {
    // console.log(req.params)
    const { id } = req.params;
    const sequelize = await getConnection();
    const [result, metadata] = await sequelize.query(
      `
            SELECT 
            PROD.id, 
            PROD.sku,
            PROD.nombre,
            PROD.descripcion,
            CAT.nombre_categoria as categoria,
            PROD.marca,
            PROD.precio, ROUND(PROD.precio / DIVI.valor,2) AS precio_en_dolares,
            PROD.cantidad_disponible AS stock_disponible,
            DIVI.valor as valor_dolar_dia,
            DATE_FORMAT(DIVI.actualizado_el, '%d-%m-%Y - %H:%i') as fecha_actualizacion_dolar
            FROM productos PROD 
            INNER JOIN categoria CAT on PROD.id_categoria = CAT.id
            INNER JOIN divisas DIVI ON PROD.codigo_divisa = DIVI.codigo_divisa
            WHERE PROD.id=${id}`
    );
    // console.log(result);
    // Verificar si hay resultados
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "El producto no se encuentra disponible." });
    }
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const productoPorNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const sequelize = await getConnection();
    const [results, metadata] = await sequelize.query(
      `SELECT 
                PROD.id, 
                PROD.nombre,
                CAT.nombre_categoria as categoria,
                PROD.precio, 
                ROUND(PROD.precio / DIVI.valor, 2) AS precio_en_dolares,
                DIVI.valor as valor_dolar_dia,
                DIVI.actualizado_el as dolar_actualizado
            FROM productos PROD 
            INNER JOIN divisas DIVI ON PROD.codigo_divisa = DIVI.codigo_divisa 
            INNER JOIN categoria CAT on PROD.id_categoria = CAT.id 
            WHERE PROD.nombre = :nombre`,
      {
        replacements: { nombre },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "El producto no se encuentra disponible." });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getDivisas = async (req, res) => {
  try {
    const { nombre } = req.params;
    const sequelize = await getConnection();
    const [results, metadata] = await sequelize.query(
      `
      SELECT
      codigo_divisa,
      nombre_divisa,
      valor,
      DATE_FORMAT(actualizado_el, '%d-%m-%Y - %H:%i') as 'Fecha Actualización'
      FROM divisas
      `,
      {
        replacements: { nombre },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Bad Request, url inválida" });
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// INSERT INTO productos ( nombre, descripcion, precio, codigo_divisa, cantidad_disponible, id_categoria) VALUES ('pala', 'nunca hay agarrao una pala', '29990', 'USD', '25', '3');

export const products = {
  // GET
  obtenerProducto,
  productoPorID,
  productoPorNombre,
  getDivisas,
};
