// threadRoutes tests
const request = require('supertest')
const expect = require('expect')

const app = require('app')
const { Reply, Thread } = require('models')

const { testThreads, testReplies, populateThreads, populateReplies } = require('util/seed')

beforeEach(populateThreads)
beforeEach(populateReplies)

describe('Reply Routes', () => {
  describe('POST /api/replies/:board/:id', () => {
    it('creates a new reply', async () => {
      const reply = { body: 'New reply!', password: '123abc' }

      const res = await request(app)
        .post(`/api/replies/testboard/${testThreads[0]._id}`)
        .send(reply)
        .expect(200)
        .expect('Content-Type', /json/)

      expect(res.body.body).toBe(reply.body)
      expect(res.body.thread).toBe(String(testThreads[0]._id))
    })

    it('updates the bumpedAt on the thread', async () => {
      const reply = { body: 'New reply!', password: '123abc' }

      const res = await request(app)
        .post(`/api/replies/testboard/${testThreads[0]._id}`)
        .send(reply)
        .expect(200)

      const threadDB = await Thread.findById(testThreads[0]._id)
      expect(+threadDB.bumpedAt).toBeGreaterThan(+testThreads[0].bumpedAt)
    })
  })

  describe('GET /api/replies/:board/:id', () => {
    it('returns JSON format', () => {

    })

    it('returns replies that match the model', () => {

    })

    it('does not include the passwords', async () => {
      try {
        const res = await request(app).get(`/api/replies/testboard/${testThreads[0]._id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.replies).toBeDefined()
        expect(res.body.replies[0].password).not.toBeDefined()
      } catch (err) {
        throw err
      }
    })
  })
})
