const winston = require('winston')
const logger = require('../utils/logger')

describe('Logger Configuration', () => {
  it('should add Console transport when NODE_ENV is not production', () => {
    process.env.NODE_ENV = 'development'
    logger.clear(); // Clear existing transports
    require('../utils/logger'); // Re-require to apply changes
    const consoleTransport = logger.transports.find(transport => transport instanceof winston.transports.Console)
    expect(consoleTransport).toBeDefined()
  })

  it('should not add Console transport when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production'
    logger.clear(); // Clear existing transports
    require('../utils/logger'); // Re-require to apply changes
    const consoleTransport = logger.transports.find(transport => transport instanceof winston.transports.Console)
    expect(consoleTransport).toBeUndefined()
  })

  it('should use simple format for Console transport', () => {
    process.env.NODE_ENV = 'development'
    logger.clear(); // Clear existing transports
    require('../utils/logger'); // Re-require to apply changes
    const consoleTransport = logger.transports.find(transport => transport instanceof winston.transports.Console)
    expect(consoleTransport.format).toEqual(winston.format.simple())
  })
})
