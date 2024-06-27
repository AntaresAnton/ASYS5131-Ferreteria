import { Sequelize } from 'sequelize'
import claves from './../config'
import { getConnection, closeConnection, sequelize } from '../database/database'

jest.mock('sequelize')
jest.mock('./../config', () => ({
  database: 'test_db',
  user: 'test_user',
  password: 'test_password',
  host: 'test_host'
}))

describe('Database Connection', () => {
  let authenticateMock, closeMock

  beforeAll(() => {
    authenticateMock = jest.fn()
    closeMock = jest.fn()
    Sequelize.mockImplementation(() => ({
      authenticate: authenticateMock,
      close: closeMock
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getConnection', () => {
    it('should establish a connection successfully', async () => {
      authenticateMock.mockResolvedValue()

      const connection = await getConnection()

      expect(authenticateMock).toHaveBeenCalled()
      expect(connection).toBe(sequelize)
    })

    it('should throw an error if connection fails', async () => {
      const errorMessage = 'Test Error'
      authenticateMock.mockRejectedValue(new Error(errorMessage))

      await expect(getConnection()).rejects.toThrow(`Error al conectar con la base de datos: ${errorMessage}`)
      expect(authenticateMock).toHaveBeenCalled()
    })
  })

  describe('closeConnection', () => {
    it('should close the connection successfully', async () => {
      closeMock.mockResolvedValue()

      await closeConnection()

      expect(closeMock).toHaveBeenCalled()
    })

    it('should log an error if closing connection fails', async () => {
      const errorMessage = 'Test Error'
      closeMock.mockRejectedValue(new Error(errorMessage))
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      await closeConnection()

      expect(closeMock).toHaveBeenCalled()
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cerrar la conexión:', errorMessage)
      consoleErrorSpy.mockRestore()
    })
  })

  describe('process.on SIGINT', () => {
    it('should close the connection and exit the process', async () => {
      const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {})
      closeMock.mockResolvedValue()

      process.emit('SIGINT')

      expect(closeMock).toHaveBeenCalled()
      expect(processExitSpy).toHaveBeenCalledWith(0)
      processExitSpy.mockRestore()
    })
  })
})
