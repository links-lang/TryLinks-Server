/* eslint-env mocha */
var expect = require('chai').expect
var userDB = require('../../db/user-quiries')
var fileDB = require('../../db/file-quiries')

// Testing variables
const username = 'test'
const email = 'test@abc.com'
const password = 'something'

describe('File DB tests', function () {
  beforeEach(function () {
    return userDB.removeUser(username)
      .then(function () {
        return userDB.createUser(username, email, password)
      })
  })

  it('should have correct starting code after insert into DB', function () {
    for (var i = 0; i < 6; i++) {
      fileDB.getFileForUser(username, i)
        .then((file) => {
          /* eslint-disable */
          expect(file.data).to.equal('')
          /* eslint-enable */
        })
    }
  })

  it('should update file', function () {
    const newSource = 'new sources'
    fileDB.updateFile(username, 0, newSource)
      .then(function () {
        return fileDB.getFileForUser(username, 0)
      }).then((file) => {
        expect(file.data).to.equal(newSource)
      })
  })
})
