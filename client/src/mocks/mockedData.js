export const mockNewThread = {
  title: 'Test Thread 1',
  body: 'Test Body 1',
  board: 'testboard',
  password: '123abc'
}

export const mockNewReply = {
  title: 'Test Thread 1',
  body: 'Test Body 1',
  board: 'testboard',
  password: '123abc'
}

export const mockUpdate = {
  type: 'update',
  id: '5a5d998b54890b334e762bb9',
  board: 'testboard',
  title: 'Updated title',
  body: 'potato'
}

export const mockThreadArray = [
  {
    '_id': '5a601ab04850285e0994284a',
    'title': 'Test Thread 1',
    'body': 'Test Body 1',
    'board': 'testboard',
    '__v': 0,
    'bumpedAt': '2018-01-18T03:55:28.093Z',
    'createdAt': '2018-01-18T03:55:28.093Z',
    'reports': 1,
    'votes': 102,
    'replyCount': 0
  },
  {
    '_id': '5a431ab04850285e0994284a',
    'title': 'Test Thread 2',
    'body': 'Test Body 2',
    'board': 'testboard',
    '__v': 0,
    'bumpedAt': '2018-01-18T03:55:28.093Z',
    'createdAt': '2018-01-18T03:55:28.093Z',
    'reports': 5,
    'votes': -20,
    'replyCount': 0
  }
]

export const mockReplyArray = [
  {
    '_id': '5a6fce2c44ee232134cfacb4',
    'body': 'Test reply 1',
    'thread': '5a6fce2c44ee232134cfacb1',
    '__v': 0,
    'reports': 0,
    'votes': -5,
    'createdAt': '2018-01-30T01:45:15.956Z'
  },

  {
    '_id': '5a6fce2c44ee241134cfacb4',
    'body': 'Test reply 2',
    'thread': '5a6fce2c44ee232134cfacb1',
    '__v': 0,
    'reports': 1,
    'votes': 25,
    'createdAt': '2018-01-30T01:45:15.956Z'
  }
]

export const mockReplyData = {
  'page': 1,
  'limit': 25,
  'replies': [
    {
      '_id': '5a6fce2c44ee232134cfacb4',
      'body': 'Test reply 3',
      'thread': '5a6fce2c44ee232134cfacb1',
      '__v': 0,
      'reports': 0,
      'votes': 0,
      'createdAt': '2018-01-30T01:45:15.956Z'
    }
  ],
  'skip': 0,
  'threadId': '5a6fce2c44ee232134cfacb1'
}

export const mockBoard = {
  'page': 1,
  'limit': 50,
  'threads': [
    {
      '_id': '5a601ab04850285e0994284a',
      'title': 'Test Thread 2',
      'body': 'Test Body 2',
      'board': 'testboard',
      '__v': 0,
      'bumpedAt': '2018-01-18T03:55:28.093Z',
      'createdAt': '2018-01-18T03:55:28.093Z',
      'reports': 0,
      'votes': 0,
      'replyCount': 0
    }
  ],
  'skip': 0,
  'boardName': 'testboard'
}
