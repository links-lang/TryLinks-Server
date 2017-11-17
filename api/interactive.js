const { spawn } = require('child_process')
function initInteractive (req, res, next) {
  var io = require('../sockets_base').io
  io.of('/nickwu').on('connection', function (socket) {
    // start new shell process
    var shell = spawn('linx')

    socket.on('new command', function (cmd) {
      console.log('new command: ' + cmd)
      shell.stdin.write(cmd + '\n')
    })

    shell.stdout.on('data', (data) => {
      socket.emit('shell output', data.toString())
      console.log('sent stdout: ' + data)
    })

    shell.stderr.on('data', (data) => {
      socket.emit('shell error', data.toString())
      console.log('sent stderr: ' + data)
    })

    socket.on('disconnect', function () {
      console.log('killing shell')
      shell.kill()
    })
  })

  res.status(200).json({message: 'socket inited successfully'})
}

module.exports = {
  initInteractive: initInteractive
}
