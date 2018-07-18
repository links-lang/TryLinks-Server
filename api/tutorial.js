const tutorialDB = require('../db/tutorial-queries');

function createTutorial(req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const source = req.body.source;

  if (title === undefined || description === undefined || source === undefined) {
    res.status(400).json({
      status: 'error',
      message: 'The tutorial is required to have a title, description and initial source code.'
    });
    return;
  }

  tutorialDB.createTutorial(title, description, source)
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: `Tutorial was successfully created`
      });
    })
    .catch(() => {
      res.status(500).json({
        status: 'error',
        message: 'Could not create a new tutorial'});
    });

};

function getDescription(req, res, next) {
  const tutorialId = parseInt(req.body.tutorialId);

  if (isNaN(tutorialId)) {
    res.status(403).json({
      status: 'error',
      message: 'Unrecognizable tutorial number'
    });
    return;
  }

  tutorialDB.getTutorialDescription(tutorialId)
    .then((description) => {
      res.status(200).json({
        status: 'success',
        description: description
      })
    })
    .catch(() => {
    res.status(500).json({
        status: 'error',
        message: 'Cannot retrieve the tutorial\'s description'
      });
    })
};

module.exports = {
  createTutorial: createTutorial,
  getDescription: getDescription
};