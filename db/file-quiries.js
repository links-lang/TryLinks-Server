// Init db.
var promise = require('bluebird');
var db = require('./db-connect');

/**
 * All DB actions for LinksUser.
 */
function getAllFilesForUser(user_id, callback) {
    db.any('select * from "LinksFile" where "userId" = $1', user_id)
        .then(data => callback({
            status: 'success',
            data: data,
            message: 'Retrieved All files for one Links user'
        }))
        .catch(err => callback(err));
}

function updateFile(file_id, data, callback) {
    if (data == null || data == undefined || data.length == 0) return;
    db.none('update "LinksFile" set "data"=$1 where "fileId"=$2', [data, file_id])
        .then(callback({
            status: 'success',
            message: 'Updated Links File with id: ' + file_id
        }))
        .catch(err => callback(err));

}

module.exports = {
    getAllFilesForUser: getAllFilesForUser,
    updateFile: updateFile
};