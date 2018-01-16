// threadRoutes tests
const request = require('supertest')
const expect = require('expect')

const app = require('app')
const { Reply } = require('models')

const { testThreads, testReplies, populateThreads, populateReplies } = require('util/seed')

beforeEach(populateThreads)
beforeEach(populateReplies)

describe('Reply Routes', () => {
  
})
