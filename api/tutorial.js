const tutorialDB = require('../db/tutorial-queries')

// Check if the user is logged-in
function isLoggedIn (req, res) {
  // Check if the user is logged in
  if (!req.session.user) {
    res.status(401)
      .json({
        status: 'error',
        message: 'Creation of a new tutorial requires to be logged-in.'
      })
    return false
  }
  return true
}

// Check if the user has admin rights
function isAdmin (req, res) {
  if (!req.session.user.is_admin) {
    console.log(`Unauthorized user (${req.session.user.username}) attempted to create a new tutorial`)
    res.status(403)
      .json({
        status: 'error',
        message: 'Insufficient privileges. Only admin can add a new tutorial.'
      })
    return false
  }
  return true
}

function createTutorial (req, res, next) {
  if (!isLoggedIn(req, res)) return
  if (!isAdmin(req, res)) return

  const title = req.body.title
  const description = req.body.description
  const source = req.body.source

  if (title === undefined || description === undefined || source === undefined) {
    res.status(400).json({
      status: 'error',
      message: 'The tutorial is required to have a title, description and initial source code.'
    })
    return
  }

  tutorialDB.createTutorial(title, description, source)
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: `Tutorial was successfully created.`
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Could not create a new tutorial.'
      })
    })
}

function getDescription (req, res, next) {
  const tutorialId = parseInt(req.body.tutorialId)

  if (isNaN(tutorialId)) {
    res.status(403).json({
      status: 'error',
      message: 'Unrecognizable tutorial number.'
    })
    return
  }

  tutorialDB.getTutorialDescription(tutorialId)
    .then((result) => {
      res.status(200).json({
        status: 'success',
        description: result.description
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Cannot retrieve the tutorial\'s description.'
      })
    })
};

function getHeaders (req, res) {
  tutorialDB.getHeaders()
    .then((result) => {
      res.status(200).json({
        status: 'success',
        headers: result
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Cannot retrieve the tutorials\' headers.'
      })
    })
}

// Retrieve a smallest tutorial id which can be used in case a requested tutorial does not exist
function getDefaultTutorialId (req, res) {
  tutorialDB.getDefaultTutorialId()
    .then((result) => {
      res.status(200).json({
        status: 'success',
        tutorialId: result.min
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Cannot retrieve a default tutorial\'s ID.'
      })
    })
}

function updateTutorial (req, res) {
  if (!isLoggedIn(req, res)) return
  if (!isAdmin(req, res)) return

  const tutorialId = parseInt(req.body.tutorialId)
  const title = req.body.title
  const description = req.body.description
  const source = req.body.source

  tutorialDB.updateTutorial(tutorialId, title, description, source)
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Tutorial has been successfully updated.'
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Cannot update the tutorial.'
      })
    })
}

function removeTutorial (req, res) {
  if (!isLoggedIn(req, res)) return
  if (!isAdmin(req, res)) return

  const tutorialId = parseInt(req.body.tutorialId)

  tutorialDB.removeTutorial(tutorialId)
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Tutorial has been successfully deleted.'
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        status: 'error',
        message: 'Cannot delete the tutorial.'
      })
    })
}

module.exports = {
  createTutorial: createTutorial,
  getDescription: getDescription,
  getHeaders: getHeaders,
  getDefaultTutorialId: getDefaultTutorialId,
  updateTutorial: updateTutorial,
  removeTutorial: removeTutorial
}
