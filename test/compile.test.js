const api = require('../api/compile')

api.createSourceFile('nickwu', 1)
  .then(() => {
    console.log('success')
  }).catch(err => {
    console.log(err)
  })
