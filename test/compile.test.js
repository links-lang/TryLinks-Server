var spawn = require('child-process-promise').spawn

var promise = spawn('linx', [`--config=tmp/nickwu_config`, `tmp/nickwu_source.links`], { capture: [ 'stdout', 'stderr' ] })

var proc = promise.childProcess

proc.stdout.on('data', function (data) {
  console.log('[spawn] stdout: ', data.toString())
})

promise.then(function (result) {
  console.log('[spawn] stdout: ', result.stdout.toString())
})
  .catch(function (err) {
    console.error('[spawn] stderr: ', err.stderr)
  })
