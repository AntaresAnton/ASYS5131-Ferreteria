// tests/product.test.js
const request = require('supertest');
const app = require('../app');
const { getConnection } = require('../database/database');
const { QueryTypes } = require('sequelize');

jest.mock('../database/database');

describe('Product API', () => {
  describe('GET /productos', () => {
    it('should fetch all products', async () => {
      const mockProducts = [{
        id: 1,
        sku: '2',
        nombre: 'Destornillador',
        descripcion: 'Destornillador de estrella',
        marca: 'DeWalt',
        precio: 2000,
        precio_en_dolares: 2.23,
        stock_disponible: 200,
        valor_dolar_dia: 898.13,
        fecha_actualizacion_dolar: '29-05-2024 - 12:42'
      }];
      
      getConnection.mockResolvedValue({
        query: jest.fn().mockResolvedValue([mockProducts, {}]),
      });

      const res = await request(app).get('/productos');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockProducts);
    });

    it('should return 404 if no products are available', async () => {
      getConnection.mockResolvedValue({
        query: jest.fn().mockResolvedValue([[], {}]),
      });

      const res = await request(app).get('/productos');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "No hay productos disponibles." });
    });
  });

  describe('GET /productos/:id', () => {
    it('should fetch product by ID', async () => {
      const mockProduct = [{
        id: 2,
        sku: '445750',
        nombre: 'Destornillador',
        descripcion: 'Destornillador de estrella',
        categoria: 'Herramientas manuales',
        marca: 'DeWalt',
        precio: 2000,
        precio_en_dolares: 2.23,
        stock_disponible: 200,
        valor_dolar_dia: 898.13,
        fecha_actualizacion_dolar: '29-05-2024 - 12:42'
      }];
      
      getConnection.mockResolvedValue({
        query: jest.fn().mockResolvedValue([mockProduct, {}]),
      });

      const res = await request(app).get('/productos/2');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockProduct);
    });

    it('should return 404 if product is not found', async () => {
      getConnection.mockResolvedValue({
        query: jest.fn().mockResolvedValue([[], {}]),
      });

      const res = await request(app).get('/productos/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "El producto no se encuentra disponible." });
    });
  });

  describe('GET /productos/nombre/:nombre', () => {
    it('should fetch product by name', async () => {
      const mockProduct = [{
        id: 1,
        nombre: 'Product 1',
        categoria: 'Category 1',
        precio: 1000,
        precio_en_dolares: 1.25,
        valor_dolar_dia: 800,
        dolar_actualizado: '01-01-2024 - 12:00'
      }];
      
      getConnection.mockResolvedValue({
        query: jest.fn().mockResolvedValue([mockProduct, {}]),
      });

      const res = await request(app).get('/productos/nombre/martillo');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockProduct);
    });

    it('should return 404 if product is not found by name', async () => {
      getConnection.mockResolvedValue({
        query: jest.fn().mockResolvedValue([[], {}]),
      });

      const res = await request(app).get('/productos/nombre/NonExistent');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "El producto no se encuentra disponible." });
    });
  });

  describe('GET /divisas', () => {
    it('should fetch all currencies', async () => {
      const mockCurrencies = [{
        codigo_divisa: 'USD',
        nombre_divisa: 'Dólar estadounidense',
        valor: 800,
        'Fecha Actualización': '01-01-2024 - 12:00'
      }];
      
      getConnection.mockResolvedValue({
        query: jest.fn().mockResolvedValue([mockCurrencies, {}]),
      });

      const res = await request(app).get('/divisas');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockCurrencies);
    });

    it('should return 404 if no currencies are available', async () => {
      getConnection.mockResolvedValue({
        query: jest.fn().mockResolvedValue([[], {}]),
      });

      const res = await request(app).get('/divisas/usd');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Bad Request, url inválida" });
    });
  });
});
