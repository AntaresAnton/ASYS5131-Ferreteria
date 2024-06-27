const request = require('supertest')
const app = require('../app')

describe('Swagger Documentation', () => {
  it('should return 200 for the Swagger documentation endpoint', async () => {
    const response = await request(app).get('/api-docs')
    expect(response.status).toBe(200)
  })

  it('should return the Swagger UI HTML content', async () => {
    const response = await request(app).get('/api-docs')
    expect(response.text).toContain('<title>Swagger UI</title>')
  })

  it('should return JSON for the Swagger JSON endpoint', async () => {
    const response = await request(app).get('/api-docs.json')
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
  })

  it('should contain the expected Swagger documentation structure', async () => {
    const response = await request(app).get('/api-docs.json')
    const swaggerDoc = response.body
    expect(swaggerDoc).toHaveProperty('swagger')
    expect(swaggerDoc).toHaveProperty('info')
    expect(swaggerDoc).toHaveProperty('paths')
  })
})
