// threadRoutes tests
const request = require('supertest')
const expect = require('expect')

const app = require('app')
const { Thread } = require('models')

const { testThreads, populateThreads } = require('tests/seed')

beforeEach(populateThreads)

describe('Thread Routes', () => {
  describe('POST api/threads/:board', () => {
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
    it('returns JSON format', (done) => {
      request(app)
        .get('/api/threads/test_board')
        .expect('Content-Type', /json/, done)
    })

    it('returns threads & they match the model', async () => {
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
            votes: expect.any(Number),
            reports: expect.any(Number)
          })
        )
      } catch (err) {
        throw new Error(err)
      }
    })

    it('returns page, limit, skip, threads, and boardName', async () => {
      try {
        const res = await request(app).get('/api/threads/testboard')

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(
          expect.objectContaining({
            page: expect.any(Number),
            limit: expect.any(Number),
            skip: expect.any(Number),
            boardName: 'testboard',
            threads: expect.any(Array)
          })
        )
      } catch (err) {
        throw new Error(err)
      }
    })

    it('uses page, limit, and skip queries', async () => {
      try {
        const page = 2
        const limit = 1
        const res = await request(app)
          .get(`/api/threads/testboard?page=${page}&limit=${limit}`)
          .expect(200)

        expect(res.body.threads.length).toBe(1)
        expect(res.body.page).toBe(2)
        expect(res.body.limit).toBe(1)
        // expect(res.body)
      } catch (err) {
        throw new Error(err)
      }
    })
  })

  describe('PATCH api/threads/:board', () => {
    it('increments reports when receives type === "report"', async () => {
      try {
        const update = { type: 'report', id: testThreads[0]._id }
        const res = await request(app)
          .patch('/api/threads/testboard')
          .send(update)
          .expect(200)

        expect(res.body.reports).toBeDefined()
        expect(res.body.reports).toBe(1)
      } catch (err) {
        throw new Error(err)
      }
    })

    it('increments reports when receives type === "increment"', async () => {
      try {
        const update = { type: 'increment', id: testThreads[0]._id }
        const res = await request(app)
          .patch('/api/threads/testboard')
          .send(update)
          .expect(200)

        expect(res.body.votes).toBeDefined()
        expect(res.body.votes).toBe(1)
      } catch (err) {
        throw new Error(err)
      }
    })

    it('decrements reports when receives type === "decrement"', async () => {
      try {
        const update = { type: 'decrement', id: testThreads[0]._id }
        const res = await request(app)
          .patch('/api/threads/testboard')
          .send(update)
          .expect(200)

        expect(res.body.votes).toBeDefined()
        expect(res.body.votes).toBe(-1)
      } catch (err) {
        throw new Error(err)
      }
    })
  })
})
