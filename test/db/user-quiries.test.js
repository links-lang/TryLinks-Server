/* eslint-env mocha */

var expect = require('chai').expect
var db = require('../../db/db-connect')
var userDB = require('../../db/user-quiries')

describe('User DB tests', function () {
  it('should return user list with length than 0', function () {
    expect(userDB.getAllUsers).to.have.length.above(0)
  })
})
