var express = require('express');
var router = express.Router();

var db = require('../db/quiries');

router.get('/api/users', db.getAllUsers);
router.get('/api/users/:id', db.getAUser);
router.post('/api/users', db.createUser);
router.put('/api/users/:id', db.updateUser);
router.delete('/api/users/:id', db.removeUser);

router.get('/api/files/:id', db.getAllFilesForUser);
router.put('/api/files/:id', db.updateFile);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
