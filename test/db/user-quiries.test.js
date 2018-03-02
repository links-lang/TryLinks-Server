/* eslint-env mocha */
var fail = require('assert').fail
var expect = require('chai').expect
var userDB = require('../../db/user-quiries')
var fileDB = require('../../db/file-quiries')

// Testing variables
const username = 'test'
const email = 'test@abc.com'
const password = 'something'

describe('User DB tests', function () {
  beforeEach(function () {
    return userDB.removeUser(username)
      .then(function () {
        return userDB.createUser(username, email, password)
      })
  })

  it('should have user after insert into DB', function () {
    return userDB.getUserByUsername(username)
      .then((user) => {
        expect(user.username).to.equal(username)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)
      })
  })

  it('should update user', function () {
    const newEmail = 'new.test@abc.com'
    const newPassword = 'new_password'
    const newLastTutorial = 3

    const update = {
      email: newEmail,
      password: newPassword,
      last_tutorial: newLastTutorial
    }
    return userDB.updateUser(username, update)
      .then(function () {
        return userDB.getUserByUsername(username)
      })
      .then((user) => {
        expect(user.email).to.equal(newEmail)
        expect(user.password).to.equal(newPassword)
        expect(user.last_tutorial).to.equal(newLastTutorial)
      })
  })

  it('should have all 6 tutorials after user is created', function () {
    for (var i = 0; i < 6; i++) {
      fileDB.getFileForUser(username, i)
        .then((file) => {
          /* eslint-disable */
          expect(file.data).to.not.be.null
          /* eslint-enable */
        })
    }
  })

  it('should have no tutorials after user is deleted', function () {
    userDB.removeUser(username)
      .then(function () {
        for (var i = 0; i < 6; i++) {
          fileDB.getFileForUser(username, i)
            .then((file) => {
              fail()
            })
            .catch((e) => {
              console.log('expected expection')
            })
        }
      })
  })
})
