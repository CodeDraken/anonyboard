// threadRoutes tests
const request = require('supertest')

const app = require('app')
const { Thread } = require('models')
const threadRoutes = require('routes/threadRoutes')

// describe('app.js', () => {
//   describe('Test the root path /', () => {
//     it('should respond to the GET method', async () => {
//       const res = await request(app).get('/')

//       expect(res.statusCode).toBe(200)
//     })
//   })
// })

describe('Thread Routes', () => {

  describe('POST api/threads/:board', () => {

    it('creates a new thread', async (done) => {
      const thread = {
        title: 'Test',
        body: 'Hot',
        board: 'Test Board',
        password: '123abc'
      }

      try {
        const res = await request(app)
          .post('/api/threads/test_board')
          .send(thread)
        
        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe(thread.title)
        
        const threadDB = await Thread.find(thread)
        
        expect(threadDB.length).toBe(1)
        expect(threadDB[0].body).toBe(thread.body)
      } catch (err) {
        done(err)
      }
    })

  })

})
