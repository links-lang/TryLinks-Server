// Init db.
var db = require('./db-connect')

/**
 * All DB actions for LinksUser.
 */

function getAllUsers (next) {
  db.any('select * from "LinksUser"')
    .then(data => next({
      status: 'success',
      data: data,
      message: 'Retrived all Links users'
    }))
    .catch(err => next(err))
}

function getUserByUsername (username, next) {
  db.one('select * from "LinksUser" where "username" = $1', username)
    .then(data => next({
      status: 'success',
      data: data,
      message: 'Retrieved one Links user'
    }))
    .catch(err => next(err))
}

function createUser (username, email, password, next) {
  db.none('insert into "LinksUser"("username", "email", "password", "last_tutorial")' +
        'values($1, $2, $3, 0)', [username, email, password])
    .then(next({
      status: 'success',
      message: 'inserted new Links user'
    }))
    .catch(err => next(err))
}

function updateUser (username, update, next) {
  var changeDetails = []
  if (update.email != null && update.email !== undefined) {
    changeDetails.push('"email"=\'' + update.email + '\'')
  }
  if (update.password != null && update.password !== undefined) {
    changeDetails.push('"password"=\'' + update.password + '\'')
  }
  const lastTutorial = parseInt(update.last_tutorial)
  if (lastTutorial != null && lastTutorial !== undefined && !isNaN(lastTutorial)) {
    console.log('last tutorial included')
    changeDetails.push('"last_tutorial"=' + lastTutorial)
  }
  var changeStr = changeDetails.join(',')

  if (changeStr.length === 0) {
    next({ status: 'error', message: 'Nothing to update!' })
    return
  }

  db.none('update "LinksUser" set ' + changeStr + ' where "username"=$1', username)
    .then(next({
      status: 'success',
      message: 'Updated Links User with username: ' + username
    }))
    .catch(err => next(err))
}

function removeUser (userId, next) {
  db.result('delete from "LinksUser" where "userId"=$1', userId)
    .then(result => next({
      status: 'success',
      message: 'Removed ' + result.rowCount + ' user with id: ' + userId
    }))
    .catch(err => next(err))
}

module.exports = {
  getAllUsers: getAllUsers,
  getUserByUsername: getUserByUsername,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
}
