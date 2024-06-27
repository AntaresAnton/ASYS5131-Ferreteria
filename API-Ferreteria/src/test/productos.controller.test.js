import { productoPorID } from '../controllers/productos.controller'
import { getConnection } from '../database/database'
import { HTTP_STATUS, MESSAGES } from '../constants'
import { handleError } from '../utils/errorHandler'

jest.mock('../database/database')
jest.mock('../utils/errorHandler')

describe('productoPorID', () => {
  let req, res, sequelizeMock, queryMock

  beforeEach(() => {
    req = { params: { id: '1' } }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    queryMock = jest.fn()
    sequelizeMock = { query: queryMock, QueryTypes: { SELECT: 'SELECT' } }
    getConnection.mockResolvedValue(sequelizeMock)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 400 if id is not provided', async () => {
    req.params.id = undefined
    await productoPorID(req, res)
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: "ID inválido" })
  })

  it('should return 400 if id is not a number', async () => {
    req.params.id = 'abc'
    await productoPorID(req, res)
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: "ID inválido" })
  })

  it('should return 404 if no product is found', async () => {
    queryMock.mockResolvedValue([[], {}])
    await productoPorID(req, res)
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND)
    expect(res.json).toHaveBeenCalledWith({ message: MESSAGES.PRODUCT_NOT_FOUND })
  })

  it('should return product details if product is found', async () => {
    const product = [{ id: 1, nombre: 'Producto Test' }]
    queryMock.mockResolvedValue([product, {}])
    await productoPorID(req, res)
    expect(res.json).toHaveBeenCalledWith(product)
  })

  it('should handle errors and call handleError', async () => {
    const error = new Error('Test Error')
    queryMock.mockRejectedValue(error)
    await productoPorID(req, res)
    expect(handleError).toHaveBeenCalledWith(res, error)
  })
})
