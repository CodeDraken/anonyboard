// seed.js - reset & seed the database for testing ( dont use on prod db )
const { ObjectId } = require('mongodb')

const { Thread } = require('models')

const testThreads = [
  {
    title: 'Test Thread 1',
    body: 'Test Body 1',
    board: 'testboard',
    password: '123abc',
    _id: new ObjectId()
  },

  {
    title: 'Test Thread 2',
    body: 'Test Body 2',
    board: 'testboard',
    password: '123abc',
    _id: new ObjectId()
  }
]

// TODO: add replies and link them

// remove all threads then insert test threads
const populateThreads = () => Thread
  .remove({})
  .then(() => {
    const threadOne = new Thread(testThreads[0]).save()
    const threadTwo = new Thread(testThreads[1]).save()

    return Promise.all([ threadOne, threadTwo ])
  })

module.exports = {
  testThreads,
  populateThreads
}
