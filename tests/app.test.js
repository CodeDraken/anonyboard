// app.js tests

const mongoose = require('mongoose')
const request = require('supertest')
const expect = require('expect')

const app = require('../app')

// after(done => {
//   mongoose.disconnect(done)
// })

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
