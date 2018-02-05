/* eslint-env mocha */
var fail = require('assert').fail
var ok = require('assert').ok
var expect = require('chai').expect
var userDB = require('../../db/user-quiries')

// Testing variables
const username = 'test'
const email = 'test@abc.com'
const password = 'something'

describe('User DB tests', function () {
  beforeEach(function () {
    return userDB.removeUser(username)
  })

  it('should have user after insert into DB', function () {
    userDB.createUser(username, email, password)
      .then(() => userDB.getUserByUsername(username))
      .then((user) => {
        expect(user.username).to.equal(username)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)
        ok(true)
      })
      .catch((e) => {
        console.log(e)
        fail()
      })
  })
})
