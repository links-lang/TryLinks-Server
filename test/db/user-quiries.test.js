/* eslint-env mocha */

var expect = require('chai').expect
var db = require('../../db/db-connect')
var userDB = require('../../db/user-quiries')

describe('User DB tests', function () {
  it('should return user list with length than 0', function () {
    userDB.getAllUsers(result => {
      expect(result).to.have.property('status', 'success')
      expect(result).to.have.property('data')
      expect(result.data).to.have.length.above(0)
    })
  })
})
