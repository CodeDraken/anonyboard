// app.js tests
const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../app')

afterAll((done) => {
  mongoose.disconnect(done)
})

describe('app.js', () => {
  describe('Test the root path /', () => {
    it('should respond to the GET method', async () => {
      const res = await request(app).get('/')

      expect(res.statusCode).toBe(200)
    })
  })
})
