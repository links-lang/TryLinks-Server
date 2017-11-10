var fileDB = require('../db/file-quiries')

function readFile (req, res, next) {
  // Check cookie first.
  if (!req.session.user) {
    res.status(401)
      .json({
        status: 'error',
        message: 'No authentication. Make sure you have logged in'
      })
    return
  }

  const userId = req.session.user.userId
  const tutorial = parseInt(req.body.tutorial)
  if (isNaN(tutorial)) {
    res.status(403).json({status: 'error', message: 'Unrecongnizable tutorial number'})
    return
  }
  fileDB.getFileForUser(userId, tutorial, result => {
    if (result.status === 'success') {
      res.status(200).json({
        status: 'success',
        fileData: result.data
      })
    } else {
      res.status(500).json({
        status: 'error',
        message: 'failed to extract files from DB'
      })
    }
  })
}

function writeFile (req, res, next) {
  // Check cookie first.
  if (!req.session.user) {
    res.status(401)
      .json({
        status: 'error',
        message: 'No authentication. Make sure you have logged in'
      })
    return
  }

  const userId = req.session.user.userId
  const tutorial = parseInt(req.body.tutorial)
  const fileData = req.body.fileData
  if (isNaN(tutorial)) {
    res.status(403).json({status: 'error', message: 'Unrecongnizable tutorial number'})
    return
  }
  fileDB.updateFile(userId, tutorial, fileData, result => {
    if (result.status === 'success') {
      res.status(200).json(result)
    } else {
      res.status(500).json({
        status: 'error',
        message: 'failed to write file to DB'
      })
    }
  })
}

module.exports = {
  readFile: readFile,
  writeFile: writeFile
}
