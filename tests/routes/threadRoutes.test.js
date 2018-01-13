// threadRoutes tests
const request = require('supertest')
const expect = require('expect')

const app = require('app')
const { Thread } = require('models')

const { testThreads, populateThreads } = require('tests/seed')

// describe('app.js', () => {
//   describe('Test the root path /', () => {
//     it('should respond to the GET method', async () => {
//       try {
//         const res = await request(app).get('/')

//         expect(res.statusCode).toBe(200)
//       } catch (err) {
//         throw new Error(err)
//       }
//     })
//   })
// })

describe('Thread Routes', () => {
  describe('POST api/threads/:board', () => {
    beforeEach(populateThreads)

    it('should creates a new thread', async () => {
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
        throw new Error(err)
      }
    })
  })

  describe('GET api/threads/:board', () => {
    beforeEach(populateThreads)

    it('lists recent threads', async () => {
      try {
        const res = await request(app).get('/api/threads/test_board')

        expect(res.statusCode).toBe(200)
        expect(res.body.threads).toBeDefined()
        expect(res.body.threads.length).toBe(2)

        const testThread = res.body.threads
          .filter(t => t._id === testThreads[0]._id)[0]

        expect(testThread).toBeDefined()
        expect(testThread).toBe(expect.objectContaining(testThreads[0]))
      } catch (err) {
        throw new Error(err)
      }
    })

    it('returns JSON format', (done) => {
      request(app)
        .get('/api/threads/test_board')
        .expect('Content-Type', /json/)
        .end((err) => {
          if (err) throw err
          done()
        })
    })
  })
})
