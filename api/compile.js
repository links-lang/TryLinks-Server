const fs = require('fs-extra')
const pf = require('portfinder')
const fileDB = require('../db/file-quiries')
const { spawn } = require('child_process')

module.exports.createConfigFile = username => {
  return pf.getPortPromise()
    .then(port => {
      module.exports.port = port
      const filename = `tmp/${username}_config`
      const data = `port=${port}\n`
      return fs.outputFile(filename, data)
    }).catch(err => {
      console.log(err)
      throw err
    })
}

module.exports.createSourceFile = (username, tutorialId) => {
  return fileDB.getFileForUser(username, tutorialId)
    .then((result) => {
      const fileData = result.data
      const filename = `tmp/${username}_source.links`
      return fs.outputFile(filename, fileData)
    }).catch(err => {
      console.log(err)
      throw err
    })
}

module.exports.compileLinksFile = function (req, res, next) {
  if (!req.session.user) {
    res.status(401)
      .json({
        status: 'error',
        message: 'No authentication. Make sure you have logged in'
      })
    return
  }

  const username = req.session.user.username
  const tutorialId = req.session.user.last_tutorial
  Promise.all([module.exports.createConfigFile(username),
    module.exports.createSourceFile(username, tutorialId)])
    .then(() => {
      // Kill existing links program for the user.
      if (module.exports.linxProc !== null &&
        module.exports.linxProc !== undefined &&
        !module.exports.linxProc.killed) {
        module.exports.linxProc.kill()
      }

      module.exports.linxProc = spawn('linx', [`--config=tmp/${username}_config`, `tmp/${username}_source.links`])

      module.exports.linxProc.stderr.on('data', (data) => {
        console.log(data.toString())
        module.exports.linxProc.kill()
        res.status(500).json({
          status: 'compile error',
          message: data
        })
      })

      res.status(200).json({
        status: 'compiled and deployed',
        port: module.exports.port
      })
    })
    .catch(error => {
      console.log(error)
      res.status(500)
        .json({
          status: 'error',
          detail: error
        })
    })
}

module.exports.stopLinksProgram = function (req, res, next) {
  if (!req.session.user) {
    res.status(401)
      .json({
        status: 'error',
        message: 'No authentication. Make sure you have logged in'
      })
    return
  }

  if (module.exports.linxProc !== null &&
    module.exports.linxProc !== undefined &&
    !module.exports.linxProc.killed) {
    module.exports.linxProc.kill()
  }

  res.status(200).json({
    status: 'killed'
  })
}
