const api = require('../api/compile')

api.createConfigFile('nickwu')
  .then(() => {
    console.log('success')
  }).catch(err => {
    console.log(err)
  })
