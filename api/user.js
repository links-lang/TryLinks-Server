var user_db = require('../db/user-quiries');
var bcrypt = require('bcryptjs');

function signup(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // Check if username is used.
    user_db.getUserByUsername(username, result => {
        if (result.status == 'success') {
            res.status(409)
                .json({
                    status: 'error',
                    message: 'Username used'
                });
        } else {
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
            });
        }
    });
}

function login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    // Check if user exists.
    user_db.getUserByUsername(username, result => {
        if (result.status == 'success') {
            if (bcrypt.compareSync(password, result.data.password)) {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Login successful'
                    });
                // TODO: set cookie.
            } else {
                res.status(401)
                    .json({
                        status: 'error',
                        message: 'Incorrect login or password'
                    });
            }
        } else {
            res.status(404)
                .json({
                    status: 'error',
                    message: 'Username not found'
                });

        }
    });
}

// function update(req, res, next) {
//     const user_id = parseInt(req.body.user_id);
//     if (isNaN(user_id)) {
//         res.status(500).json({status: 'error', message: 'Unrecognizable user id'});
//         return ;
//     }
//     const username = req.body.username;
//     const password = req.body.password;

//     // Check if user exists.
//     user_db.getUserByUsername(username, result => {
//         if (result.status == 'success') {
//             if (password === result.data.password) {
//                 res.status(200)
//                     .json({
//                         status: 'success',
//                         message: 'Login successful'
//                     });
//                 // TODO: set cookie.
//             } else {
//                 res.status(401)
//                     .json({
//                         status: 'error',
//                         message: 'Incorrect login or password'
//                     });
//             }
//         } else {
//             res.status(404)
//                 .json({
//                     status: 'error',
//                     message: 'Username not found'
//                 });

//         }
//     });
// }

module.exports = {
    signup: signup,
    login: login
};
