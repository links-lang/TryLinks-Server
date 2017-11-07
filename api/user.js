var user_db = require('../db/user-quiries');
var bcrypt = require('bcryptjs');

// function userSignUp(req, res, next) {
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;

//     // Hashing
//     const salt = bcrypt.genSaltSync();
//     const hash = bcrypt.hashSync(password, salt);
// }
