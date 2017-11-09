var user_db = require('../db/user-quiries');
var bcrypt = require('bcryptjs');

function userSignUp(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // Check if username is used.
    user_db.getUserByUsername(username, result => {
        if (result.userId) {
            res.status(409)
                .json({
                    status: 'error',
                    message: 'Username used'
                });
            return;
        }
    });

    // Hashing
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    console.log(hash);

    user_db.createUser(username, email, hash, result => {
        if (result.status == 'success') {
            res.status(200)
                .json(result.message);
        } else {
            res.status(500)
                .json(result);
        }
    })
}

module.exports = {
    userSignUp: userSignUp
}
