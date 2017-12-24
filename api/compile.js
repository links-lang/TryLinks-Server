const Promise = require('bluebird')
const fs = require('fs')
const pf = require('portfinder')
const { spawn } = require('child_process')

module.exports.createConfigFile = function (username) {
  pf.getPortPromise()
    .then(port => {
      module.exports.port = port
      return new Promise(fs.writeFile(`/tmp/nickwu_config`, `port=${port}`))
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
  this.createConfigFile(username)
    .then(() => {
      var linxProc = spawn(`linx --config=/tmp/${username}_conig /tmp/${username}_source.links`)

      linxProc.stderr.on('data', (data) => {
        console.log(data)
        linxProc.kill()
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
