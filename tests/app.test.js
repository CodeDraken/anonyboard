// app.js tests
const request = require('supertest')
const expect = require('expect')

const app = require('../app')

describe('app.js', () => {
  describe('Test the root path /', () => {
    it('responds to the GET method', async () => {
      const res = await request(app).get('/')

      expect(res.statusCode).toBe(200)
    })

    it('returns HTML format', done => {
      request(app)
        .get('/')
        .expect('Content-Type', /html/, done)
    })
  })
})
