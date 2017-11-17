var express = require('express')
var router = express.Router()
var userAPI = require('../api/user')
var fileAPI = require('../api/file')
var interativeAPI = require('../api/interactive')

router.post('/api/user/signup', userAPI.signup)
router.post('/api/user/login', userAPI.login)
router.post('/api/user/update', userAPI.update)
router.post('/api/file/read', fileAPI.readFile)
router.post('/api/file/write', fileAPI.writeFile)
router.get('/api/initInteractive', interativeAPI.initInteractive)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
