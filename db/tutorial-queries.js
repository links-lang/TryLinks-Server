// Init db.
let db = require('./db-connect');

/**
 * All DB actions for LinksTutorial
 */
function createTutorial(title, description, source) {
  return db.none('INSERT INTO "LinksTutorial"("title, "description", "source") VALUES($1, $2, $3)',
                  [title, description, source]);
}

function getTutorialDescription(tutorialId) {
  return db.one('SELECT "description" FROM "LinksTutorial" WHERE "tutorial_id" = $1', tutorialId);
}

function getTutorialSource(tutorialId) {
  return db.one('SELECT "source" FROM "LinksTutorial" WHERE "tutorial_id" = $1', tutorialId);
}

module.exports = {
  createTutorial: createTutorial,
  getTutorialDescription: getTutorialDescription,
  getTutorialSource: getTutorialSource
};