const { validateEnvVariables } = require('../controllers/scraperdolar.controller')

describe('validateEnvVariables', () => {
  it('should throw an error if required environment variables are missing', () => {
    process.env.REQUIRED_VAR = ''
    expect(() => validateEnvVariables()).toThrow('Missing required environment variables')
  })

  it('should not throw an error if all required environment variables are present', () => {
    process.env.REQUIRED_VAR = 'some_value'
    expect(() => validateEnvVariables()).not.toThrow()
  })

  it('should handle multiple required environment variables', () => {
    process.env.REQUIRED_VAR_1 = 'value1'
    process.env.REQUIRED_VAR_2 = 'value2'
    expect(() => validateEnvVariables()).not.toThrow()
  })

  it('should throw an error if any one of multiple required environment variables is missing', () => {
    process.env.REQUIRED_VAR_1 = 'value1'
    process.env.REQUIRED_VAR_2 = ''
    expect(() => validateEnvVariables()).toThrow('Missing required environment variables')
  })
})
