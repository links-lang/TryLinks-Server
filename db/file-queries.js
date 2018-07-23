// Init db.
var db = require('./db-connect')

/**
 * All DB actions for LinksUser.
 */
function getFileForUser (username, tutorialId) {
  return db.task('getFileForUSer', t => {
    return db.oneOrNone('SELECT "data" FROM "LinksFile" WHERE "username" = $1 AND "tutorial_id"=$2', [username, tutorialId])
      .then(file => {
        return file || t.one('INSERT INTO "LinksFile" ("data", "tutorial_id", "username") VALUES' +
          '((SELECT "source" FROM "LinksTutorial" WHERE "tutorial_id" = $1), $1, $2) RETURNING "data"', [tutorialId, username])
      })
  })
}

function updateFile (username, tutorialId, data) {
  if (data == null || data === undefined || data.length === 0) {
    const err = {status: 'error', message: 'empty or null source to update'}
    throw err
  }
  return db.none('update "LinksFile" set "data"=$1 where "username" = $2 and "tutorial_id"=$3',
    [data, username, tutorialId])
}

module.exports = {
  getFileForUser: getFileForUser,
  updateFile: updateFile
}
