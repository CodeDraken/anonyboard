// seed.js - reset & seed the database for testing ( dont use on prod db )
const { ObjectId } = require('mongodb')

const { Thread, Reply } = require('models')

const testThreads = [
  {
    title: 'Test Thread 1',
    body: 'Test Body 1',
    board: 'testboard',
    password: '123abc',
    // _replies: [ testReplies[0]._id, testReplies[1]._id ],
    _id: new ObjectId(),
    bumpedAt: Date.now(),
    createdAt: Date.now(),
    replyCount: 2
  },

  {
    title: 'Test Thread 2',
    body: 'Test Body 2',
    board: 'testboard',
    password: '123abc',
    _id: new ObjectId(),
    bumpedAt: Date.now(),
    createdAt: Date.now(),
    replyCount: 1
  }
]

const testReplies = [
  {
    body: 'Test reply 1',
    password: '123abc',
    _id: new ObjectId(),
    thread: testThreads[0]._id
  },
  {
    body: 'Test reply 2',
    password: '123abc',
    _id: new ObjectId(),
    thread: testThreads[0]._id
  },
  {
    body: 'Test reply 3',
    password: '123abc',
    _id: new ObjectId(),
    thread: testThreads[1]._id
  }
]

// remove all threads then insert test threads
const populateThreads = () => Thread
  .remove({})
  .then(() => {
    const threadOne = new Thread(testThreads[0]).save()
    const threadTwo = new Thread(testThreads[1]).save()

    return Promise.all([ threadOne, threadTwo ])
  })

// remove all replies then insert test replies
const populateReplies = () => Reply
  .remove({})
  .then(() => {
    const replyOne = new Reply(testReplies[0]).save()
    const replyTwo = new Reply(testReplies[1]).save()
    const replyThree = new Reply(testReplies[2]).save()

    return Promise.all([ replyOne, replyTwo, replyThree ])
  })

module.exports = {
  testThreads,
  testReplies,
  populateThreads,
  populateReplies
}
