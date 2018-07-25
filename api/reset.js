var fileDB = require('../db/file-queries')

const startSources = require('../tutorials/sources').startingLinksSources

module.exports.resetLinksSource = function (username) {
  var promises = []
  for (var i = 0; i < 6; i++) {
    promises.push(fileDB.updateFile(username, i, startSources[i]))
  }
  return Promise.all(promises)
}

module.exports.resetLinksSourceAPI = function (req, res, next) {
  // Check cookie first.
  if (!req.session.user) {
    res.status(401)
      .json({
        status: 'error',
        message: 'No authentication. Make sure you have logged in'
      })
    return
  }

  const username = req.session.user.username
  module.exports.resetLinksSource(username)
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'source updated'
      })
    }).catch(() => {
      res.status(500).json({
        status: 'error',
        message: 'failed to write file to DB'
      })
    })
}
