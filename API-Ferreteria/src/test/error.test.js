const { handleError } = require('../utils/error')

describe('handleError', () => {
  let res

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  it('should respond with the provided status code and error message', () => {
    const error = { statusCode: 400, message: 'Bad Request' }

    handleError(res, error)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      message: 'Bad Request'
    })
  })

  it('should respond with status code 500 and default message if no status code or message is provided', () => {
    const error = {}

    handleError(res, error)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      message: 'Internal server error'
    })
  })

  it('should respond with status code 500 and provided message if no status code is provided', () => {
    const error = { message: 'Something went wrong' }

    handleError(res, error)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      message: 'Something went wrong'
    })
  })

  it('should respond with provided status code and default message if no message is provided', () => {
    const error = { statusCode: 404 }

    handleError(res, error)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      ok: false,
      message: 'Internal server error'
    })
  })
})
