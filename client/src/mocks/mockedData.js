export const mockNewThread = {
  title: 'Test Thread 1',
  body: 'Test Body 1',
  board: 'testboard',
  password: '123abc'
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
