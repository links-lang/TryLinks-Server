var express = require('express');
var router = express.Router();
var user_api = require('../api/user');

router.post('/api/user/signup', user_api.signup);
router.post('/api/user/login', user_api.login);
router.post('/api/user/update', user_api.update);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
