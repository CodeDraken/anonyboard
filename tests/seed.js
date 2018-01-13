// seed.js - reset & seed the database for testing ( dont use on prod db )
const { ObjectId } = require('mongodb')

const { Thread } = require('models')

const testThreads = [
  {
    title: 'Test Thread 1',
    body: 'Test Body 1',
    board: 'Test Board',
    password: '123abc',
    _id: new ObjectId()
  },

  {
    title: 'Test Thread 2',
    body: 'Test Body 2',
    board: 'Test Board',
    password: '123abc',
    _id: new ObjectId()
  }
]

// TODO: add replies and link them

const populateThreads = () => {
  return Thread.remove({})
    .then(() => Thread.insertMany(testThreads))

  // try {
  //   await Thread.remove({})
  //   await Thread.insertMany(testThreads)
  //   return done()
  // } catch (err) {
  //   console.log(err)
  //   return done(err)
  // }
}

module.exports = {
  testThreads,
  populateThreads
}
