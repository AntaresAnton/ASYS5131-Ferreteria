/**
 * @fileoverview Controlador de productos para la API de Ferretería
 * @version 1.0.0
 * @author Johanna Hernández - Zaida König - Patricio Quintanilla
 * @description Este módulo contiene las funciones del controlador para manejar
 * las operaciones relacionadas con productos y divisas en la API de Ferretería.
 * 
 * @module productos.controller
 * 
 * @requires sequelize
 * @requires ../database/database
 * 
 * @exports {Object} products - Objeto que contiene las funciones del controlador
 * 
 * @example
 * // Importar el controlador
 * import { products } from './controllers/productos.controller';
 * 
 * // Usar una función del controlador
 * router.get('/productos', products.obtenerProducto);
 */
import { getConnection } from "./../database/database";
const sequelize = require("../database/database");

// Constants
const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

const MESSAGES = {
  NO_PRODUCTS: "No hay productos disponibles.",
  PRODUCT_NOT_FOUND: "El producto no se encuentra disponible.",
  BAD_REQUEST: "Bad Request, url inválida"
};

// Helper function for error handling
const handleError = (res, error) => {
  console.error(error);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
};

// PARA OBTENER LOS RESULTADOS
const obtenerProducto = async (req, res) => {
  try {
    const sequelize = await getConnection();
    const [result, metadata] = await sequelize.query(`
      SELECT 
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
    `);

    if (result.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: MESSAGES.NO_PRODUCTS });
    }
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
};

// PARA OBTENERLOS POR id
const productoPorID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "ID inválido" });
    }

    const sequelize = await getConnection();
    const [result, metadata] = await sequelize.query(`
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
      WHERE PROD.id = :id
    `, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT
    });

    if (result.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
    }
    res.json(result);
  } catch (error) {
    handleError(res, error);
  }
};

const productoPorNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    if (!nombre || nombre.length < 2 || nombre.length > 100 || !/^[a-zA-Z0-9\s]+$/.test(nombre)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Nombre inválido" });
    }

    const sequelize = await getConnection();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const query = `
      SELECT 
        PROD.id, 
        PROD.nombre,
        CAT.nombre_categoria as categoria,
        PROD.precio, 
        ROUND(PROD.precio / DIVI.valor, 2) AS precio_en_dolares,
        DIVI.valor as valor_dolar_dia,
        DATE_FORMAT(DIVI.actualizado_el, '%d-%m-%Y - %H:%i') as dolar_actualizado
      FROM productos PROD 
      INNER JOIN divisas DIVI ON PROD.codigo_divisa = DIVI.codigo_divisa 
      INNER JOIN categoria CAT on PROD.id_categoria = CAT.id 
      WHERE PROD.nombre = ?
      LIMIT ? OFFSET ?
    `;

    const results = await sequelize.query(query, {
      replacements: [nombre, limit, offset],
      type: sequelize.QueryTypes.SELECT,
    });

    if (results.length === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
    }
    res.json({
      page,
      limit,
      results
    });
  } catch (error) {
    console.error('Error en productoPorNombre:', error);
    handleError(res, error);
  }
};


const getDivisas = async (req, res) => {
  try {
    const sequelize = await getConnection();
    const results = await sequelize.query(`
      SELECT
      codigo_divisa,
      nombre_divisa,
      valor,
      DATE_FORMAT(actualizado_el, '%d-%m-%Y - %H:%i') as 'Fecha Actualización'
      FROM divisas
    `, {
      type: sequelize.QueryTypes.SELECT
    });

    if (results.length === 0) {
      return res.status(404).json({ message: "No hay divisas disponibles." });
    }
    res.json(results);
  } catch (error) {
    handleError(res, error);
  }
};


export const products = {
  obtenerProducto,
  productoPorID,
  productoPorNombre,
  getDivisas,
};
