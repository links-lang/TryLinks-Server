var description = require('../tutorials/descriptions')
var sources = require('../tutorials/sources').startingLinksSources
const tutorialDB = require('../db/tutorial-queries')

module.exports.populateDB = function () {
  for (let i = 0; i < 2; i++) {
    tutorialDB.createTutorial(description.startingLinksTitles[i], description.startingLinksDescription[i], sources[i])
  }
}
