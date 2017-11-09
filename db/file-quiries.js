// Init db.
var db = require('./db-connect')

/**
 * All DB actions for LinksUser.
 */
function getAllFilesForUser (userId, next) {
  db.any('select * from "LinksFile" where "userId" = $1', userId)
    .then(data => next({
      status: 'success',
      data: data,
      message: 'Retrieved All files for one Links user'
    }))
    .catch(err => next(err))
}

function updateFile (fileId, data, next) {
  if (data == null || data === undefined || data.length === 0) return
  db.none('update "LinksFile" set "data"=$1 where "fileId"=$2', [data, fileId])
    .then(next({
      status: 'success',
      message: 'Updated Links File with id: ' + fileId
    }))
    .catch(err => next(err))
}

module.exports = {
  getAllFilesForUser: getAllFilesForUser,
  updateFile: updateFile
}
