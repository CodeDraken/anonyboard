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

    it('updates the replyCount on the thread', async () => {
      const reply = { body: 'New reply!', password: '123abc' }

      const res = await request(app)
        .post(`/api/replies/testboard/${testThreads[0]._id}`)
        .send(reply)
        .expect(200)

      const threadDB = await Thread.findById(testThreads[0]._id)
      expect(+threadDB.replyCount).toBeGreaterThan(0)
    })
  })

  describe('GET /api/replies/:board/:id', () => {
    it('returns JSON format', async () => {
      try {
        const res = await request(app)
          .get(`/api/replies/testboard/${testThreads[0]._id}`)
          .expect(200)
          .expect('Content-Type', /json/)
      } catch (err) {
        throw err
      }
    })

    it('returns replies that match the model', async () => {
      try {
        const res = await request(app)
          .get(`/api/replies/testboard/${testThreads[0]._id}`)
          .expect(200)
        const { replies } = res.body
        const repliesOnTestThread = testReplies
          .filter(reply => reply.thread === testThreads[0]._id)

        expect(replies).toEqual(expect.any(Array))
        expect(replies.length).toBe(repliesOnTestThread.length)
        expect(Object.keys(replies[0]))
          .toEqual(expect.arrayContaining(
            ['body', 'createdAt', 'votes', 'reports', 'thread']
          ))
      } catch (err) {
        throw err
      }
    })

    it('does not include the passwords', async () => {
      try {
        const res = await request(app)
          .get(`/api/replies/testboard/${testThreads[0]._id}`)
          .expect(200)

        expect(res.body.replies[0].password).not.toBeDefined()
      } catch (err) {
        throw err
      }
    })
  })

  describe('PATCH /api/replies/:board/:thread', () => {
    it('increments reports when receives type === "report"', async () => {
      try {
        const update = { type: 'report', id: testReplies[0]._id }
        const res = await request(app)
          .patch(`/api/replies/testboard/${testThreads[0]._id}`)
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
        const update = { type: 'upvote', id: testReplies[0]._id }
        const res = await request(app)
          .patch(`/api/replies/testboard/${testThreads[0]._id}`)
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
        const update = { type: 'downvote', id: testReplies[0]._id }
        const res = await request(app)
          .patch(`/api/replies/testboard/${testThreads[0]._id}`)
          .send(update)
          .expect(200)

        expect(res.body.votes).toBeDefined()
        expect(res.body.votes).toBe(-1)
      } catch (err) {
        throw err
      }
    })

    it('returns an error if request is an invalid type', (done) => {
      const invalidUpdate = { type: 'hackyourcode', id: testReplies[0]._id }

      request(app)
        .patch(`/api/replies/testboard/${testThreads[0]._id}`)
        .send(invalidUpdate)
        .expect(400)
        .end(done)
    })

    it('updates the reply body when receives type === "update"', async () => {
      try {
        const update = {
          type: 'update',
          id: testReplies[0]._id,
          body: 'Updated body'
        }

        const res = await request(app)
          .patch(`/api/replies/testboard/${testThreads[0]._id}`)
          .send(update)
          .expect(200)

        expect(res.body.body).toBe(update.body)
      } catch (err) {
        throw err
      }
    })
  })

  describe('DELETE /api/replies/:board/:thread', () => {
    it('deletes a reply when given the correct password', async () => {
      const delRequest = {
        id: testReplies[0]._id,
        password: testReplies[0].password
      }

      const res = await request(app)
        .delete(`/api/replies/testboard/${testThreads[0]._id}`)
        .send(delRequest)
        .expect(200)

      expect(Object.keys(res.body))
        .toEqual(expect.arrayContaining([ '_id', 'body' ]))

      const replyDB = await Reply.findById(delRequest.id)

      expect(replyDB).toBeNull()
    })
  })
})
