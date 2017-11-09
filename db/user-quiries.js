// Init db.
var promise = require('bluebird');
var db = require('./db-connect');

/**
 * All DB actions for LinksUser.
 */

function getAllUsers(callback) {
    db.any('select * from "LinksUser"')
        .then(data => callback({
            status: 'success',
            data: data,
            message: 'Retrived all Links users'
        }))
        .catch(err => callback(err));
}

function getUserByUsername(username, callback) {
    db.one('select * from "LinksUser" where "username" = $1', username)
        .then(data => callback({
            status: 'success',
            data: data,
            message: 'Retrieved one Links user'
        }))
        .catch(err => callback(err));
}

function createUser(username, email, password, callback) {
    db.none('insert into "LinksUser"("username", "email", "password", "last_tutorial")' +
        'values($1, $2, $3, 0)', [username, email, password])
        .then(callback({
            status: 'success',
            message: 'inserted new Links user'
        }))
        .catch(err => callback(err));
}

function updateUser(username, update, callback) {
    var change_details = [];
    if (update.email != null && update.email != undefined) {
        change_details.push('"email"=\'' + update.email + '\'');
    }
    if (update.password != null && update.password != undefined) {
        change_details.push('"password"=\'' + update.password + '\'');
    }
    const last_tutorial = parseInt(update.last_tutorial);
    if (last_tutorial != null && last_tutorial != undefined && !isNaN(last_tutorial)) {
        console.log('last tutorial included');
        change_details.push('"last_tutorial"=' + last_tutorial);
    }
    var change_str = change_details.join(',');

    if (change_str.length == 0) {
        callback({ status: 'error', message: 'Nothing to update!' });
        return;
    }

    db.none('update "LinksUser" set ' + change_str + ' where "username"=$1', username)
        .then(callback({
            status: 'success',
            message: 'Updated Links User with username: ' + username
        }))
        .catch(err => callback(err));
}

function removeUser(user_id, callback) {
    db.result('delete from "LinksUser" where "userId"=$1', user_id)
        .then(result => callback({
            status: 'success',
            message: 'Removed ' + result.rowCount + ' user with id: ' + user_id
        }))
        .catch(err => callback(err));

}

module.exports = {
    getAllUsers: getAllUsers,
    getUserByUsername: getUserByUsername,
    createUser: createUser,
    updateUser: updateUser,
    removeUser: removeUser
};