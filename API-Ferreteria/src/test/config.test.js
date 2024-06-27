const { HOST } = require('../config')

describe('Config', () => {
  it('should have a HOST property', () => {
    expect(HOST).toBeDefined()
  })

  it('HOST should be a string', () => {
    expect(typeof HOST).toBe('string')
  })

  it('HOST should not be an empty string', () => {
    expect(HOST).not.toBe('')
  })

  it('HOST should be a valid URL', () => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    expect(urlPattern.test(HOST)).toBe(true)
  })
})
