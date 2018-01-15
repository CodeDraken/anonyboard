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

beforeEach(populateThreads)

describe('Thread Routes', () => {
  describe('POST api/threads/:board', () => {
    // beforeEach(populateThreads)

    it('should create a new thread', (done) => {
      const thread = {
        title: 'Test',
        body: 'Hot',
        board: 'test_board',
        password: '123abc'
      }

      request(app)
          .post('/api/threads/test_board')
          .send(thread)
          .expect(200)
          .expect('Content-Type', /json/)
          .then(async res => {
            expect(res.body.title).toBe(thread.title)
            const threadDB = await Thread.find(thread)

            expect(threadDB.length).toBe(1)
            expect(threadDB[0].body).toBe(thread.body)
            done()
          }).catch(err => done(err))
    })
  })

  describe('GET api/threads/:board', () => {
    // beforeEach(populateThreads)

    it('returns recent threads', async () => {
      try {
        const res = await request(app).get('/api/threads/testboard')

        expect(res.statusCode).toBe(200)
        expect(res.body.threads).toBeDefined()
        expect(res.body.threads.length).toBe(2)

        const testThread = res.body.threads
          .filter(t => t._id === String(testThreads[0]._id))[0]

        expect(testThread).toBeDefined()
        expect(testThread).toEqual(
          expect.objectContaining({
            ...testThread,
            __v: expect.any(Number),
            _replies: expect.any(Array),
            bumpedAt: expect.any(String),
            createdAt: expect.any(String),
            replyCount: expect.any(Number),
            votes: expect.any(Number)
          })
        )
      } catch (err) {
        throw new Error(err)
      }
    })

    it('returns JSON format', (done) => {
      request(app)
        .get('/api/threads/test_board')
        .expect('Content-Type', /json/, done)
    })
  })
})
