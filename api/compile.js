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

function killLinksProc () {
  if (module.exports.linxProc !== null &&
      module.exports.linxProc !== undefined &&
      !module.exports.linxProc.killed) {
    module.exports.linxProc.kill()
  }
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
  var io = require('../sockets_base').io
  var socketPath = `/${username}_tutorial`
  io.of(socketPath).on('connection', function (socket) {
    socket.on('compile', function () {
      Promise.all([module.exports.createConfigFile(username),
        module.exports.createSourceFile(username, tutorialId)])
        .then(() => {
          module.exports.linxProc = spawn('linx', [`--config=tmp/${username}_config`, `tmp/${username}_source.links`])
          module.exports.linxProc.stdout.on('data', (data) => {
            socket.emit('shell output', data.toString())
            console.log('sent stdout: ' + data)
          })

          module.exports.linxProc.stderr.on('data', (data) => {
            socket.emit('compile error', data.toString())
            console.log('sent stderr: ' + data)
          })
          socket.emit('compiled', module.exports.port)
        }).catch(error => {
          console.log(error)
          socket.emit('compile error', 'could not build config and source files')
        })
    })
    socket.on('disconnect', function () {
      console.log('killing shell')
      killLinksProc()
      delete io.nsps[socketPath]
    })
  })
  res.status(200).json({path: socketPath})
}
