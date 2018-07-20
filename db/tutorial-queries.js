// Init db.
let db = require('./db-connect');

/**
 * All DB actions for LinksTutorial
 */
function createTutorial(title, description, source) {
  return db.none('INSERT INTO "LinksTutorial" ("title", "description", "source") VALUES($1, $2, $3)',
                  [title, description, source]);
}

function getTutorial(tutorialId) {
  return db.one('SELECT "title, description, source" FROM "LinksTutorial" WHERE "tutorial_id" = $1', tutorialId);
}

function getTutorialDescription(tutorialId) {
  return db.one('SELECT "description" FROM "LinksTutorial" WHERE "tutorial_id" = $1', tutorialId);
}

function getTutorialSource(tutorialId) {
  return db.one('SELECT "source" FROM "LinksTutorial" WHERE "tutorial_id" = $1', tutorialId);
}

function getHeaders() {
  return db.many('SELECT tutorial_id, title FROM "LinksTutorial" ORDER BY tutorial_id ASC');
}

module.exports = {
  createTutorial: createTutorial,
  getTutorial: getTutorial,
  getTutorialDescription: getTutorialDescription,
  getTutorialSource: getTutorialSource,
  getHeaders: getHeaders
};