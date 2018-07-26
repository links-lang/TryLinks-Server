/* eslint-env mocha */

/**
 * Test for REPL related API endpoints:
 *   /api/initInteractive
 *   Socket channel for Links REPL functionality
 *
 * Assume a test account exists in db.
 *   username: test
 *   password: test
 */

var assert = require('assert')
var request = require('supertest')
var io = require('socket.io-client')

describe('User login', function () {
  var baseUrl = 'http://localhost:5000'
  const loginProfile = {
    username: 'test',
    password: 'test'
  }

  describe('Tests for authenticated endpoints', function () {
    var socket

    beforeEach(function (done) {
      request(baseUrl)
        .post('/api/user/login')
        .send(loginProfile)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err
          // var cookie = res.headers['set-cookie']
          // Setup
          console.log(`logged in, trying to connect to ${baseUrl}/test`)
          socket = io.connect(`${baseUrl}/test`, {
            'reconnection delay': 0,
            'reopen delay': 0,
            'force new connection': true
          })
          socket.on('connect', function () {
            console.log('worked...')
            done()
          })
          socket.on('connect_error', function (err) {
            console.log(err)
          })
          socket.on('disconnect', function () {
            console.log('disconnected...')
          })
        })
    })

    afterEach(function (done) {
      // Cleanup
      if (socket.connected) {
        console.log('disconnecting...')
        socket.disconnect()
      } else {
        // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
        console.log('no connection to break...')
      }
      done()
    })

    describe('First (hopefully useful) test', function () {
      it('Doing some things with indexOf()', function (done) {
        var a = 2
        assert(a === 2)
        done()
      })
    })
  })
})
