var express = require('express')
var router = express.Router()
var userAPI = require('../api/user')

router.post('/api/user/signup', userAPI.signup)
router.post('/api/user/login', userAPI.login)
router.post('/api/user/update', userAPI.update)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
