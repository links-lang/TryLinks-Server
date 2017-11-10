// Init db.
var db = require('./db-connect')

/**
 * All DB actions for LinksUser.
 */
function getFileForUser (userId, tutorialId, next) {
  db.one('select * from "LinksFile" where "userId" = $1 and "tutorial_id"=$2', [userId, tutorialId])
    .then(data => next({
      status: 'success',
      data: data,
      message: 'Retrieved All files for one Links user'
    }))
    .catch(err => next(err))
}

function updateFile (userId, tutorialId, data, next) {
  if (data == null || data === undefined || data.length === 0) return
  db.none('update "LinksFile" set "data"=$1 where "userId" = $2 and "tutorial_id"=$3', [data, userId, tutorialId])
    .then(next({
      status: 'success',
      message: 'Updated Links File for userID: ' + userId + ' and tutorial number: ' + tutorialId
    }))
    .catch(err => next(err))
}

module.exports = {
  getFileForUser: getFileForUser,
  updateFile: updateFile
}
