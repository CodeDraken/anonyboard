// threadRoutes tests
const request = require('supertest')
const expect = require('expect')

const app = require('app')
const { Reply } = require('models')

const { testThreads, testReplies, populateThreads, populateReplies } = require('util/seed')

beforeEach(populateThreads)
beforeEach(populateReplies)

// I can POST a reply to a thead on a specific board by passing form data text, delete_password, & thread_id to /api/replies/{board} and it will also update the bumped_on date to the comments date.(Recomend res.redirect to thread page /b/{board}/{thread_id}) In the thread's 'replies' array will be saved _id, text, created_on, delete_password, & reported.

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
      expect(res.body.password).not.toBeDefined()
    })

    it('updates the bumpedAt on the thread', () => {

    })
  })
})
