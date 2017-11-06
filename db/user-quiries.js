// Init db.
var promise = require('bluebird');
var db = require('./db-connect');

/**
 * All DB actions for LinksUser.
 */ 

function getAllUsers(req, res, next) {
    db.any('select * from "LinksUser"')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrived all Links users'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getAUser(req, res, next) {
    const user_id = parseInt(req.params.id);
    db.one('select * from "LinksUser" where "userId" = $1', user_id)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one Links user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createUser(req, res, next) {
    db.none('insert into "LinksUser"("username", "email", "password", "last_tutorial")' +
        'values(${username}, ${email}, ${password}, 0)', req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'inserted new Links user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateUser(req, res, next) {
    const user_id = parseInt(req.params.id);
    var change_details = [];
    if (req.body.username != null && req.body.username != undefined) {
        change_details.push('"username"=\'' + req.body.username + '\'');
    }
    if (req.body.email != null && req.body.email != undefined) {
        change_details.push('"email"=\'' +req.body.email + '\'');
    }
    if (req.body.password != null && req.body.password != undefined) {
        change_details.push('"password"=\'' +req.body.password + '\'');
    }
    const last_tutorial = parseInt(req.body.last_tutorial);
    if (last_tutorial != null && last_tutorial != undefined) {
        change_details.push('"last_tutorial"='+last_tutorial);
    }
    var change_str = change_details.join(',');
    db.none('update "LinksUser" set ' + change_str + ' where "userId"=$1', user_id)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated Links User with id: ' + user_id
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeUser(req, res, next) {
    const user_id = parseInt(req.params.id);
    db.result('delete from "LinksUser" where "userId"=$1', user_id)
        .then(function(result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ' + result.rowCount + ' user with id: ' + user_id
                });    
        }).catch(function(err) {
            return next(err);
        });
}

module.exports = {
    getAllUsers: getAllUsers,
    getAUser: getAUser,
    createUser: createUser,
    updateUser: updateUser,
    removeUser: removeUser
};