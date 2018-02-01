// threadRoutes tests
const request = require('supertest')
const expect = require('expect')

const app = require('app')
const { Thread } = require('models')

const { testThreads, testReplies, populateThreads, populateReplies } = require('util/seed')

beforeEach(populateThreads)
beforeEach(populateReplies)

describe('Thread Routes', () => {
  describe('POST /api/threads/:board', () => {
    it('create a new thread', (done) => {
      const thread = {
        title: 'Test',
        body: 'Hot',
        board: 'test_board',
        password: '123abc'
      }

      request(app)
          .post('/api/threads/testboard')
          .send(thread)
          .expect(200)
          .expect('Content-Type', /json/)
          .then(async res => {
            expect(res.body.title).toBe(thread.title)
            const threadDB = await Thread.findById(res.body._id)

            expect(threadDB.title).toBe(thread.title)
            done()
          })
          .catch(err => done(err))
    })
  })

  describe('GET /api/threads/:board', () => {
    it('returns JSON format', (done) => {
      request(app)
        .get('/api/threads/testboard')
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
            // _replies: expect.any(Array),
            bumpedAt: expect.any(String),
            createdAt: expect.any(String),
            replyCount: expect.any(Number),
            votes: expect.any(Number),
            reports: expect.any(Number)
          })
        )
      } catch (err) {
        throw err
      }
    })

    it('does not include the passwords', async () => {
      try {
        const res = await request(app).get('/api/threads/testboard')

        expect(res.statusCode).toBe(200)
        expect(res.body.threads).toBeDefined()
        expect(res.body.threads[0].password).not.toBeDefined()
      } catch (err) {
        throw err
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
        throw err
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
        throw err
      }
    })
  })

  describe('GET /api/threads/:board/:thread', () => {
    it('returns a single thread', async () => {
      try {
        const res = await request(app).get(`/api/threads/testboard/${testThreads[0]._id}`)

        expect(res.statusCode).toBe(200)

        expect(res.body).toEqual(
          expect.objectContaining({
            title: testThreads[0].title,
            body: testThreads[0].body,
            __v: expect.any(Number),
            // _replies: expect.any(Array),
            bumpedAt: expect.any(String),
            createdAt: expect.any(String),
            replyCount: expect.any(Number),
            votes: expect.any(Number),
            reports: expect.any(Number)
          })
        )
      } catch (err) {
        throw err
      }
    })
  })

  describe('PATCH /api/threads/:board', () => {
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
        throw err
      }
    })

    it('increments reports when receives type === "upvote"', async () => {
      try {
        const update = { type: 'upvote', id: testThreads[0]._id }
        const res = await request(app)
          .patch('/api/threads/testboard')
          .send(update)
          .expect(200)

        expect(res.body.votes).toBeDefined()
        expect(res.body.votes).toBe(1)
      } catch (err) {
        throw err
      }
    })

    it('decrements reports when receives type === "downvote"', async () => {
      try {
        const update = { type: 'downvote', id: testThreads[0]._id }
        const res = await request(app)
          .patch('/api/threads/testboard')
          .send(update)
          .expect(200)

        expect(res.body.votes).toBeDefined()
        expect(res.body.votes).toBe(-1)
      } catch (err) {
        throw err
      }
    })

    it('returns an error if request is an invalid type', (done) => {
      const invalidUpdate = { type: 'hackyourcode', id: testThreads[0]._id }

      request(app)
        .patch('/api/threads/testboard')
        .send(invalidUpdate)
        .expect(400)
        .end(done)
    })

    it('updates the thread when receives type === "update"', async () => {
      try {
        const update = {
          type: 'update',
          id: testThreads[0]._id,
          title: 'Updated title',
          body: 'Updated body',
          password: testThreads[0].password
        }

        const res = await request(app)
          .patch('/api/threads/testboard')
          .send(update)
          .expect(200)

        expect(res.body.title).toBe(update.title)
        expect(res.body.body).toBe(update.body)
      } catch (err) {
        throw err
      }
    })
  })

  describe('DELETE /api/threads/:board', () => {
    it('deletes a thread when given the correct password', async () => {
      const delRequest = {
        id: testThreads[0]._id,
        password: testThreads[0].password
      }

      const res = await request(app)
        .delete('/api/threads/testboard')
        .send(delRequest)
        .expect(200)

      expect(Object.keys(res.body))
        .toEqual(expect.arrayContaining([ '_id', 'body', 'title' ]))

      const threadDB = await Thread.findById(delRequest.id)

      expect(threadDB).toBeNull()
    })
  })
})
