// Init db.
let db = require('./db-connect')

/**
 * All DB actions for LinksTutorial
 */
function createTutorial (title, description, source) {
  return db.none('INSERT INTO "LinksTutorial" ("title", "description", "source") VALUES($1, $2, $3)',
    [title, description, source])
}

function getTutorialDescription (tutorialId) {
  return db.one('SELECT "description" FROM "LinksTutorial" WHERE "tutorial_id" = $1', tutorialId)
}

function getHeaders () {
  return db.many('SELECT tutorial_id, title FROM "LinksTutorial" ORDER BY tutorial_id ASC')
}

module.exports = {
  createTutorial: createTutorial,
  getTutorialDescription: getTutorialDescription,
  getHeaders: getHeaders
}
