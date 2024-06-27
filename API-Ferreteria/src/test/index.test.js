const request = require('supertest')
const app = require('../app')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

describe('API-Ferreteria Server Initialization', () => {
  it('should use bodyParser middleware', () => {
    const middleware = app._router.stack.find(layer => layer.name === 'jsonParser')
    expect(middleware).toBeDefined()
  })

  it('should use cors middleware', () => {
    const middleware = app._router.stack.find(layer => layer.name === 'corsMiddleware')
    expect(middleware).toBeDefined()
  })

  it('should start the server on the specified port', async () => {
    const PORT = process.env.PORT || 3000
    const response = await request(app).get('/')
    expect(response.status).toBe(404); // Assuming the root route is not defined
    expect(response.request.port).toBe(PORT.toString())
  })

  it('should handle server start errors gracefully', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

    const server = app.listen(0).on('error', (err) => {
      expect(mockConsoleError).toHaveBeenCalledWith('Error al iniciar el servidor:', err)
      expect(mockExit).toHaveBeenCalledWith(1)
    })

    server.emit('error', new Error('Test Error'))
    mockExit.mockRestore()
    mockConsoleError.mockRestore()
  })

  it('should handle SIGTERM signal for graceful shutdown', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {})

    const server = app.listen(0)
    process.emit('SIGTERM')

    expect(mockConsoleLog).toHaveBeenCalledWith('SIGTERM recibido. Cerrando servidor...')
    server.close(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith('Servidor cerrado.')
      expect(mockExit).toHaveBeenCalledWith(0)
    })

    mockExit.mockRestore()
    mockConsoleLog.mockRestore()
  })
})
