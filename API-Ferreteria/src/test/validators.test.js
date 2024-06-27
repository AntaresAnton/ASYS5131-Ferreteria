const { CustomError } = require('../utils/error')
const { validateInput } = require('../utils/validators')

describe('validateInput', () => {
  it('should throw CustomError if input is null', () => {
    expect(() => validateInput(null)).toThrow(CustomError)
  })

  it('should throw CustomError if input is undefined', () => {
    expect(() => validateInput(undefined)).toThrow(CustomError)
  })

  it('should throw CustomError if input is an empty string', () => {
    expect(() => validateInput('')).toThrow(CustomError)
  })

  it('should not throw an error for valid input', () => {
    expect(() => validateInput('valid input')).not.toThrow()
  })

  it('should throw CustomError with specific message for invalid input', () => {
    try {
      validateInput(null)
    } catch (e) {
      expect(e).toBeInstanceOf(CustomError)
      expect(e.message).toBe('Invalid input')
    }
  })
})
